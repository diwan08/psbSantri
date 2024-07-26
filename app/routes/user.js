const routes = require('express').Router();
const controller = require('../controllers/users');

routes.get("/info", controller.getAll)

module.exports= routes