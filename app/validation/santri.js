const Joi = require("joi");

module.exports= Joi.object({
    nik : Joi.number().required(),
    name: Joi.string().required().trim(),
    tempat_lahir: Joi.string().required().trim(),
    tanggal_lahir: Joi.date().required(),
    jenis_kelamin: Joi.string().required().valid("L","P"),
    asal_sekolah: Joi.string().required().trim(),
    jenis_pendaftaran: Joi.string().required().valid("santri_baru","mutasi_sekolah_lain"),
    mendaftar_ke_lembaga: Joi.string().valid("RA","MI","MTS","MA","PONDOK_SAJA"),
    nama_wali: Joi.string().required().trim()
})