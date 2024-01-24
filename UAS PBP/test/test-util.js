import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

export const removeAllTestSongs = async () => {
  await prismaClient.song.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestSong = async () => {
  await prismaClient.song.create({
    data: {
      title: "test",
      singer: "test",
      album: "test",
      year: "2000",
      label: "test",
      songwriter: "test",
    },
  });
};

export const createManyTestSongs = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.song.create({
      data: {
        username: `test`,
        title: `test ${i}`,
        singer: `test ${i}`,
        album: `test ${i}`,
        year: `2000${i}`,
        label: `test${i}`,
        songwriter: `test${i}`,
      },
    });
  }
};

export const getTestSong = async () => {
  return prismaClient.song.findFirst({
    where: {
      username: "test",
    },
  });
};

