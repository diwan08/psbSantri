require("dotenv").config()
const Joi = require("joi")

module.exports= Joi.object({
    id_santri: Joi.string().trim().required()
})