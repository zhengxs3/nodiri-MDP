const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(150).required(),
  role: Joi.string().valid("parent", "child", "teen", "young_adult").required(),
  birthdate: Joi.date().required(),
  parent_code: Joi.string().allow("", null)
});

module.exports = { userSchema };
