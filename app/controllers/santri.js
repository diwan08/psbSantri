require('dotenv').config()
const db    = require('../../database')
const santriSchema = require('../validation/santri')

module.exports = class santriController {
    static async createData(req, res) {
        try {
            const {value, error} = santriSchema.validate(req.body);
            if (error) {
                return res.boom.badRequest(error.message)
            }
            const id = require('crypto').randomUUID()
            await db.transaction(async function(trx) {
                await db('santri')
                    .insert({
                        id,
                        nik: value.nik,
                        name: value.name,
                        tempat_lahir: value.tempat_lahir,
                        tanggal_lahir: value.tanggal_lahir,
                        jenis_kelamin : value.jenis_kelamin,
                        asal_sekolah : value.asal_sekolah,
                        jenis_pendaftaran : value.jenis_pendaftaran,
                        mendaftar_ke_lembaga: value.mendaftar_ke_lembaga,
                        nama_wali: value.nama_wali
                    })
                    .transacting(trx)
                    .catch(err => {
                        return res.boom.badRequest(err)
                    })
            })
            return res.json({
                success : true,
                message: 'data created'
            })
        } catch (error) {
            return res.boom.badRequest(error)
        }
    }
    static async getDetail(req, res){
      try {
        const {id}= req.params;

       const d = await db("santri")
                    .select("id","name","tempat_lahir", "tanggal_lahir","jenis_kelamin","asal_sekolah","jenis_pendaftaran","mendaftar_ke_lembaga", "nama_wali")
                    .where({id})
                    .first()

            return res.json({
              success: true,
              message: "get detail successfully retrieved",
              d
            })
    
      } catch (error) {
        return res.boom.badRequest(error.message)
      }
    }
    static async getAll(req, res, next) {
        try {
          //get data qury params for paginations, query params ?
          const { page = 1, limit = 25, search = "", order = "asc" } = req.query;
    
          const santri = await db("santri")
            .limit(+limit)
            .offset(+limit * +page - +limit)
            .orderBy("created_at", order)
            .where("nik", "like", `%${search}%`);
          return res.json({
            success: true,
            message: "santri gotten",
            santri,
          });
        } catch (error) {
          next(error);
        }
      }
}