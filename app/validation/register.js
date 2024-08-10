const Joi = require("joi");

module.exports = Joi.object({
  email: Joi.string().required().email().trim(),
  password: Joi.string().required().trim(),
  nama: Joi.string().required().trim(),
  role: Joi.string().valid("admin",'santri')
});