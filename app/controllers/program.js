const e = require("express")
const db = require("../../database")
const program = require("../validation/program")
const santri = require("../validation/santri")

module.exports= class programController{
    static async create(req,res) {
        try {
            const {value, error} = program.validate(req.body)
            if (error) {
                return res.boom.badRequest(error.message)
            }
            const nomer_pendaftaran  = require("crypto").randomInt(999999);
            await db.transaction(async function(trx){
                await db('daftar')
                    .insert({
                        id_santri: value.id_santri,
                        nomer_pendaftaran    
                    })
                    .transacting(trx);  
                    
                  
            });
            return res.status(201).json({
                success: true,
                message: 'user successfully registered'
            });
        } catch (error) {
            return res.boom.badRequest(error.message)
        }
    }
    static async getDetail(req, res){
        try {
          const {id}= req.params;
  
         const d = await db("daftar as d")
                      .leftJoin("santri as s", "s.id","d.id_santri")
                      .select("d.id","d.nomer_pendaftaran","s.id AS id_santri","s.name","s.tempat_lahir", "s.tanggal_lahir","s.jenis_kelamin","s.asal_sekolah","s.jenis_pendaftaran","s.mendaftar_ke_lembaga", "s.nama_wali")
                      .where({"d.id":id})
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
    
          const data = await db("daftar")
            .limit(+limit)
            .offset(+limit * +page - +limit)
            .orderBy("created_at", order)
            .where("nomer_pendaftaran", "like", `%${search}%`);
          return res.json({
            success: true,
            message: "data gotten",
            data,
          });
        } catch (error) {
          next(error);
        }
      }
}