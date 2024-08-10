require('dotenv').config();
const db        = require('../../database');
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const nodemailer = require("nodemailer")

// schema validation
const register          = require('../validation/register');
const login             = require('../validation/login');
const changePassword    = require("../validation/confirmPassword")


module.exports = class AuthController { 

  static async createData(req, res) {
    try {
        const {value, error} = register.validate(req.body);
        if (error) {
            return res.boom.badRequest(error.message)
        }
        const id = require('crypto').randomUUID()
        await db.transaction(async function(trx) {  
            await db('users')
                .insert({
                    id,
                    email: value.email,
                    password: bcrypt.hashSync(value.password, 10),
                    nama: value.nama,
                    role: 'santri',
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

  // static cleanInput(data) {
  //   return data.trim().replace(/<\/?[^>]+(>|$)/g, "");
  // }
  static generateUserId() {
    return crypto.randomBytes(16).toString('hex');
  }

    static async login (req, res) {
        try {
            // check erroe and retrieved request
            const{error, value} = login.validate(req.body)
            if (error) {
                return res.boom.badData(error.message)
            }
            // check user
            const user = await db("users").where({ email: value.email}).first();
            // return console.log(user);
            
            if (!user) {
                return res.boom.unauthorized("wrong email, please check again");
            }
            // check password
            if (!bcrypt.compareSync(value.password, user.password)) {
                return res.boom.unauthorized("wrong password, please check again")
            }
            const token =  jwt.sign({
              id: user.id,
              name: user.nama,
              email: user.email,
              },process.env.JWT_SECRET_KEY,{expiresIn: process.env.JWT_EXPIRED_TIME})

            return res.json({
                success: true,
                message: "user successfully logged in",
                token
                
            })
        } catch (error) {
            return res.boom.badRequest(error.message)
        }
    }
    static async loginAdmin (req, res) {
      try {
          // check erroe and retrieved request
          const{error, value} = login.validate(req.body)
          if (error) {
              return res.boom.badData(error.message)
          }
          // check user
          const user = await db("users").where({ email: value.email}).first();
          // return console.log(user);
          
          if (!user) {
              return res.boom.unauthorized("wrong email, please check again");
          }else if (user.role === "santri") {
            return res.boom.unauthorized('kamu tidak mempunyai akses')
          }
          // check password
          if (!bcrypt.compareSync(value.password, user.password)) {
              return res.boom.unauthorized("wrong password, please check again")
          }
          const token =  jwt.sign({
            id: user.id,
            nama: user.nama,
            email: user.email,
            },process.env.JWT_SECRET_KEY,{expiresIn: process.env.JWT_EXPIRED_TIME})

          return res.json({
              success: true,
              message: "user successfully logged in",
              token
              
          })
      } catch (error) {
          return res.boom.badRequest(error.message)
      }
  }
    static async forgotPassword(req, res){
        try {
            const otp = require("crypto").randomInt(999999);
            const {email} = req.body;

            const user = await db('users').where({email}).first();
            if (!user) {
                return res.boom.notFound("email is not registred")
            }
            await db.transaction(async function(trx) {
                await db("users")
                    .transacting(trx)
                    .where({email})
                    .update({
                        otp
                    })
            })
            const transporter = nodemailer.createTransport({
                host: process.env.SIB_HOST,
                port: 2525,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: process.env.SIB_USER, // generated ethereal user
                  pass: process.env.SIB_PASS, // generated ethereal password
                },
              });
        
              const info = await transporter.sendMail({
                from: process.env.SIB_USER, // sender address
                to: email, // list of receivers
                subject: "Change password | PSB", // Subject line
                html: `<h2>Kode OTP PSB</h2><br><p>${otp}</p>`, // html body
              });
            
              return res.json({
                success: true,
                message: 'OTP Code successfully sended',
                info})
        } catch (error) {
            return res.boom.badRequest(error.message)
        }
    }  
    static async verifyOtp(req, res) {
        try {
          // get otp from params
          const { otp } = req.params;
    
          const user = await db("users").where({ otp }).first();
          if (!user) {
            return res.boom.notFound("OTP is wrong !!!");
          }
    
          return res.json({
            success: true,
            message: "OTP successfully verified"
          })
        } catch (error) {
          return res.boom.badRequest(error.message);
        }
      }
      static async changePassword(req, res) {
        try {
          // get otp from params
          const { otp } = req.params;
      
          // check validation and retrieve request
          const { error, value } = changePassword.validate(req.body);
          if (error) {
            return res.boom.badData(error.message);
          }
    
          if (value.password != value.confirm_password) {
            return res.boom.badRequest("password is not same with confirm password");
          }
    
          await db.transaction(async function(trx) {
            await db("users")
              .transacting(trx)
              .where({ otp })
              .update({
                otp: null,
                password: bcrypt.hashSync(value.password, 10)
              })
          });
    
          return res.json({
            success: true,
            message: "change password successfully",
          })
        } catch (error) {
          return res.boom.badRequest(error.message);
        }
      }
      static async loginSantri(req, res) {
        const email = req.body.email ? cleanInput(req.body.email) : '';
        const password = req.body.password ? cleanInput(req.body.password) : '';
    
        // Validate input
        if (!email || !password) {
          return res.status(400).json({ status: 'error', message: 'Email and password are required.' });
        }
    
        // Hash the password using md5
        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    
        try {
          const user = await db('users')
            .select('id', 'email','nama', 'created_at', 'updated_at')
            .where({ email, password: hashedPassword, role: 'santri' })
            .first();
    
          if (!user) {
            return res.status(401).json({ status: 'error', message: 'Invalid email or password.' });
          }
    
          const siswa = await db('santri')
            .select('id', 'user_id', 'nama_siswa', 'alamat_siswa', 'jk_siswa', 'tl_siswa', 'no_hp_siswa', 'created_at', 'updated_at')
            .where({ user_id: user.id })
            .first();
     
          if (!siswa) {
            return res.status(404).json({ status: 'error', message: 'Siswa data not found.' });
          }
    
          // Prepare the response data
          const response = {
            status: 'success',
            user: {
              // id: user.id,
              // email: user.email,
              // verificationCode: user.verificationCode,
              // telegramId: user.telegramId,
              // role: user.role,
              // otp: user.otp,
              // created_at: user.created_at,
              // updated_at: user.updated_at
            },
            siswa
          };
    
          res.json(response);
        } catch (error) {
          res.status(500).json({ status: 'error', message: 'Server error', error: error.message });
        }
      }
     
}