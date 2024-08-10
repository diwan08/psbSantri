require("dotenv").config()
const Joi = require("joi")

module.exports= Joi.object({
    id_santri: Joi.string().trim().required(),
    biaya_pendaftaran: Joi.string().trim().required(),
    status: Joi.string().valid('belum','lunas','ditolak','pending')
})