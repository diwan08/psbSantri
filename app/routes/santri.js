const routes = require('express').Router();
const controller = require('../controllers/santri');
const authorize = require('../middlewares/authorize');
const db = require('../../database')

routes.get("/", controller.getAll)
routes.get("/detail/:id", controller.getDetail)
routes.patch("/image/:id", authorize,controller.changeAvatar)
routes.post("/registrasi",authorize ,controller.createData)
routes.get('/infosantri', authorize, async (req, res) => {
    try {
      // Ambil data santri dari database
      const santri = await db('santri').select('id', 'nik', 'name', 'tanggal_lahir', 'jenis_kelamin', 'asal_sekolah', 'jenis_pendaftaran', 'mendaftar_ke_lembaga', 'nama_wali');
      res.json({ santri });
    } catch (error) {
      res.boom.badRequest(error.message);
    }
  });
routes.put('/updateSantri/:id' ,authorize, controller.updateSantri )
module.exports= routes