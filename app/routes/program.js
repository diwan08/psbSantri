const routes = require('express').Router();
const controller = require('../controllers/program');

routes.get("/info/:id", controller.getDetail)
routes.get("/infoDaftar", controller.getAll)

routes.post("/create", controller.create)
module.exports= routes