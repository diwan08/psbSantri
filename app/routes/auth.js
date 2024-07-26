const routes = require('express').Router();
const authorize = require("../middlewares/authorize")
const controller = require('../controllers/auth');


// post
routes.post("/:otp/change-password", controller.changePassword);
routes.post('/register', controller.register);
routes.post("/forgot-password",authorize,controller.forgotPassword);
routes.post("/otp/:otp/verify",authorize,controller.verifyOtp);
routes.post('/login', controller.login)
// update
// routes.put("/:id",authorize,controller.registrasiUlang)
module.exports= routes; 