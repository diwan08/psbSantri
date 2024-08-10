require('dotenv').config()
const db    = require('../../database')
const multer = require("multer")
const upload = require("../helpers/multer")("user").single("avatar")
const santriSchema = require('../validation/santri')
const fs = require("fs")
const path = require("path")
const { log } = require('console')

module.exports = class santriController {
    static async createData(req, res) {
        try {
          console.log('Received data:', req.body);
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
            console.log("hello world"); 
          //get data qury params for paginations, query params ?
          const { page = 1, limit = 25, search = "", order = "asc" } = req.query;
    
          const santri = await db("santri")
            .select('id','nik','name','tanggal_lahir','jenis_kelamin','asal_sekolah','jenis_pendaftaran','mendaftar_ke_lembaga','nama_wali')
            .limit(+limit)
            .offset(+limit * +page - +limit)
            .orderBy("created_at", order)
            .where("nik", "like", `%${search}%`);

            // total santri
          const totalCount = await db('santri').count('id as count').where('nik', 'like', `%${search}%`).first();

          return res.json({
            success: true,
            message: "santri gotten",
            santri,
            totalCount
          });
        } catch (error) {
            console.log(error)
        //   next(error);
        }
      }
      static async updateStore(req, res) {
        try {
            // get data from params
            const {id} = req.params;

            const {error,value}= santriSchema.validate(req.body)
            if (error) {
                return res.boom.badData(error.message)
            }
            const{name,address}= value;

            await db.transaction(async function (trx) {
                await db("santri")
                    .transacting(trx)
                    .update({
                      nik,
                      name,
                      tempat_lahir,
                      tanggal_lahir,
                      jenis_kelamin,
                      asal_sekolah,
                      jenis_pendaftaran,
                      mendaftar_ke_lembaga,
                      nama_wali
                    })
                    .catch(err => {
                        return res.boom.badRequest(err.message)
                    })
            })  
              
            return res.status(201).json({
                success: true,
                message:"updated successfully retrieved"
            })

        } catch (error) {
            return res.boom.badRequest(error.message)
        }
    }
    static async deleteStore(req, res) {
      try {
          //get data from params
          const {id} = req.params;
          
          const store = await db("santri").where({id}).first()
          if (!store) {
              return res.boom.notFound("store is not found")
          }
          await db.transaction(async function(trx) {
              await db("santri")
                  .transacting(trx)
                  .del()
                  .catch(err => {
                      return res.boom.badRequest(err)
                  })
          })

          return res.status(201).json({
              success: true,
              message: "delete store successfully retrieved"
          })

      } catch (error) {
          return res.boom.badRequest(error.message)
      }
  }
  static async addAvatar(req, res, next){
    upload(req, res, async function(err){
        try {
            if (err instanceof multer.MulterError){
                return res.boom.badRequest.json({
                    success: false,
                    message: err.message
                })
            } else if(err){
                return res.boom.badRequest.json({
                    success: false,
                    message:err 
                })
            }

            // relative url or split path
            const pathAvatar =req.file.path.split("\\")
            const url = pathAvatar.splice(pathAvatar.length - 2).join("/")

            // return res.json(url)
            const user =await db("users").where({id : req.user.id}).first()
            if (user.avatar != null) {
                fs.unlinkSync(path.join(__dirname, "../../public".concat(user.avatar)))
            }

            await db("users")
            .where({id: req.user.id})
            .update({avatar: url})
            .catch(err=>{
                return res.status(400).json({
                    success: false,
                    message: err.message
                }) 
            })

            return res.json({
                success:true,
                message:"avatar successfully changed",
                avatar: req.get("host").concat("/",url)
            })
        } catch (error) {
            next(error)
        }
    })
}
}