import Joi from "joi";

const createSongValidation = Joi.object({
  title: Joi.string().max(100).required(),
  singer: Joi.string().max(100).required(),
  album: Joi.string().max(200).allow(''),
  year: Joi.string().max(20).required(),
  label: Joi.string().max(100).allow(''),
  songwriter: Joi.string().max(100).allow(''),
});

const getSongValidation = Joi.number().positive().required();

const updateSongValidation = Joi.object({
  id: Joi.number().positive().required(),
  title: Joi.string().max(100).required(),
  singer: Joi.string().max(100).required(),
  album: Joi.string().max(200).allow(''),
  year: Joi.string().max(20).required(),
  label: Joi.string().max(100).allow(''),
  songwriter: Joi.string().max(100).allow(''),
});

const searchSongValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  title: Joi.string().optional(),
  singer: Joi.string().optional(),
  year: Joi.string().optional(),
});

export {
  createSongValidation,
  getSongValidation,
  updateSongValidation,
  searchSongValidation,
};
