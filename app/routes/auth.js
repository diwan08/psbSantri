const routes = require('express').Router();
const authorize = require("../middlewares/authorize")
const controller = require('../controllers/auth');
const upload = require("multer")();


routes.get('/admin/dashboard', authorize, (req, res) => {
    res.json({ message: "Selamat datang di Dashboard Admin", user: req.user });
  });
// post
// routes.post("/:otp/change-password", controller.changePassword);
routes.post('/register', controller.createData);
// routes.post("/forgot-password",authorize,controller.forgotPassword);
// routes.post("/otp/:otp/verify",authorize,controller.verifyOtp);
routes.post('/loginSantri', controller.login)
routes.post('/loginAdmin', controller.loginAdmin)



module.exports= routes; 