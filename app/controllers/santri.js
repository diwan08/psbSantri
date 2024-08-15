require('dotenv').config()
const db    = require('../../database')
const multer = require("multer")
const minio      = require("../helpers/minio");
const upload = require("../helpers/multer")("santri").single("avatar")
const santriSchema = require('../validation/santri')
const update = require("../validation/updateSantri")
const fs = require("fs")
const path = require("path");
const { log } = require('console');

module.exports = class santriController {
    static async createData(req, res) {
        try {
            const {value, error} = santriSchema.validate(req.body);
            if (error) {
                return res.boom.badRequest(error.message)
            }
            const id = require('crypto').randomUUID()
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
                    .catch(err => {
                        return res.boom.badRequest(err)
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
            console.log("Fetching all santri data...");
      
            // Mengambil semua data santri
            const santri = await db("santri")
              .select('id', 'nik', 'name', 'tanggal_lahir', 'jenis_kelamin', 'asal_sekolah', 'jenis_pendaftaran', 'mendaftar_ke_lembaga', 'nama_wali');
            
            // Mengirimkan data ke klien
            return res.json({
              success: true,
              message: "Santri data fetched successfully",
              santri,
            });
          } catch (error) {
            console.error("Error fetching santri data:", error);
            next(error); // Memanggil middleware error handling
          }
        }
      
      static async updateSantri(req, res) {
        try {
            // get data from params
            const {id} = req.params;

            const {error,value}= update.validate(req.body)
            if (error) {
                return res.boom.badData(error.message)
            }
            const{
                
                name, 
                tempat_lahir,
                tanggal_lahir,
                jenis_kelamin,
                asal_sekolah,
                jenis_pendaftaran,
                mendaftar_ke_lembaga,
                nama_wali}= value;

            await db.transaction(async function (trx) {
                await db("santri")
                    .transacting(trx)
                    .where({id})
                    .update({
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
  static async changeAvatar(req, res, next){
    upload(req, res, async function(err){
        try {
            if (err instanceof multer.MulterError){
                return res.status(400).json({
                    success: false,
                    message: err.message
                })
            } else if(err){
                return res.status(400).json({
                    success: false,
                    message:err 
                })
            }

            // relative url or split path
            const pathAvatar =req.file.path.split("\\")
            const url = pathAvatar.splice(pathAvatar.length - 2).join("/")

            // return res.json(url)
            // const user =await db("santri").where({id: req.user.id}).first()
            // return console.log(user);
            
            // if (user.avatar != null) {
            //     fs.unlinkSync(path.join(__dirname, "../../public".concat(user.avatar)))
            // }

            await db("santri")
            .where({id : req.params.id})
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