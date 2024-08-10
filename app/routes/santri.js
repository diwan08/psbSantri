const routes = require('express').Router();
const controller = require('../controllers/santri');

routes.get("/infosantri", controller.getAll)
routes.get("/:id", controller.getDetail)
routes.patch("/image/:id",controller.addAvatar)
routes.post("/registrasi", controller.createData)
module.exports= routes