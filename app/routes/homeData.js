const routes = require("express").Router();

const controller = require("../controllers/homeData");
// const DashboardController = require('../controllers/dashboard')
// const verifyToken = require('../middlewares/authorize');


// routes.get('/admin/dashboard', verifyToken, DashboardController.getAdminDashboard);
routes.get("/homeData", controller.getHome);
module.exports = routes;