import Joi from "joi";

export const createBlogDto = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(10).required(),
  author: Joi.string().required(),
});
