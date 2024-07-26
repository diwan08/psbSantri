require("dotenv").config();
const jwt  = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (typeof token == undefined || token == "") {
            return res.boom.unathorized("token is not valid");
        }else if (token.split(" ")[0].toLowerCase() != "bearer" ) {
            return res.boom.unathorized("token is not valid");
        }
        jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY, (err, passed)=> {
            if (err) {
                return res.boom.badRequest(err.message);
            }

            req.user = passed;
            next();
        })
    } catch (error) {
        return res.boom.badRequest(error.message)
    }
}