import { validate } from "../validation/validation.js";
import {
  createSongValidation,
  getSongValidation,
  searchSongValidation,
  updateSongValidation,
} from "../validation/song-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, request) => {
  const song = validate(createSongValidation, request);
  song.username = user.username;

  return prismaClient.song.create({
    data: song,
    select: {
      id: true,
      title: true,
      singer: true,
      album: true,
      year: true,
      label: true,
      songwriter: true,
    },
  });
};

const get = async (user, songsId) => {
  songsId = validate(getSongValidation, songsId);

  const song = await prismaClient.song.findFirst({
    where: {
      username: user.username,
      id: songsId,
    },
    select: {
      id: true,
      title: true,
      singer: true,
      album: true,
      year: true,
      label: true,
      songwriter: true,
    },
  });

  if (!song) {
    throw new ResponseError(404, "song is not found");
  }

  return song;
};

const update = async (user, request) => {
  const song = validate(updateSongValidation, request);

  const totalSongInDatabase = await prismaClient.song.count({
    where: {
      username: user.username,
      id: song.id,
    },
  });

  if (totalSongInDatabase !== 1) {
    throw new ResponseError(404, "song is not found");
  }

  return prismaClient.song.update({
    where: {
      id: song.id,
    },
    data: {
      title: song.title,
      singer: song.singer,
      album: song.album,
      year: song.year,
      label: song.label,
      songwriter: song.songwriter,
    },
    select: {
      id: true,
      title: true,
      singer: true,
      album: true,
      year: true,
      label: true,
      songwriter: true,
    },
  });
};

const remove = async (user, songsId) => {
  songsId = validate(getSongValidation, songsId);

  const totalInDatabase = await prismaClient.song.count({
    where: {
      username: user.username,
      id: songsId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "song is not found");
  }

  return prismaClient.song.delete({
    where: {
      id: songsId,
    },
  });
};

const search = async (user, request) => {
  request = validate(searchSongValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    username: user.username,
  });

  if (request.title) {
    filters.push({
      title: {
        contains: request.title,
      },
    });
  }
  if (request.singer) {
    filters.push({
      singer: {
        contains: request.singer,
      },
    });
  }
  if (request.year) {
    filters.push({
      year: {
        contains: request.year,
      },
    });
  }

  const songs = await prismaClient.song.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.song.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: songs,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  create,
  get,
  update,
  remove,
  search,
};
