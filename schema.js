const Joi = require("joi");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();
// const bcrypt = require("bcryptjs");
// const CryptoJS = require("crypto-js");
const secret = "abc13";

// const mysql = require("mysql2");
// const pool = mysql
//   .createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "kaka",
//   })
//   .promise();

// const mailverify = async (req, res, next) => {
//   const email = req.body.email;
//   const [sql] = await pool.query(
//     "SELECT COUNT(email)  AS emailCount FROM users WHERE email = ?",
//     [email]
//   );

//   console.log(sql[0].emailCount);
//   console.log(sql);

//   const emailCount = sql[0].emailCount;
//   console.log(sql);
//   if (emailCount > 0) {
//     res.json({ msg: "emailExists" });
//   } else {
//     req.email = email;
//     next();
//   }
// };

// const AES = (req, res, next) => {
//   var email = req.body.email;
//   var ciphertext = CryptoJS.AES.encrypt(email, secret).toString();

//   req.ciphertext = ciphertext;
//   next();
// };

// const passwordEncode = async (req, res, next) => {
//   const { password } = req.body;
//   const hashpassword = await bcrypt.hash(password, 10);
//   req.hashpassword = hashpassword;
//   next();
// };

// const passwordDecode = async (req, res, next) => {
//   let email = req.body.email;
//   const password = req.body.password;

//   const [[last]] = await pool.query("select * from  `users`WHERE email=?", [
//     email,
//   ]);

// const passwordDecode = async (req, res, next) => {
//   let email = req.body.email;
//   const password = req.body.password;

//   const [[last]] = await pool.query("select * from  `users`WHERE email=?", [
//     email,
//   ]);

//   email = last.email;

//   const hashedPassword = last.password;

//   bcrypt.compare(password, hashedPassword, (err, result) => {
//     if (result) {
//       console.log("Password matches!");
//       req.email = email;
//       req.hashedPassword = hashedPassword;
//       next();
//     } else {
//       console.log("Password does not match!");
//     }
//   });
// };

// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt("my message", "secret key 123");
// // Decrypt
// var bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
// var originalText = bytes.toString(CryptoJS.enc.Utf8);

// console.log(originalText);

// const verifyUser = (req, res, next) => {
//   var token = req.headers["authorization"];
//   if (!token) {
//     return res.send("Access Denied");
//   }
//   try {
//     var verified = token.split(" ")[1];
//     verified = jwt.verify(token, secret);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.send("Invalid Token");
//   }
// };
// const forgotpassword = async (req, res, next) => {
//   const { email } = req.body;
//   const [sql] = await pool.query(
//     "SELECT COUNT(email)  AS emailCount FROM users WHERE email = ?",
//     [email]
//   );
//   const emailCount = sql[0].emailCount;
//   console.log(sql);
//   if (emailCount === 1) {
//     // req.username = username;
//     req.email = email;
//     next();
//   } else {
//     res.json({ msg: "email not exists" });
//   }
// };

const signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
});
const webHookSchema = Joi.object({
  id: Joi.number().integer(),
  webHookData: Joi.string().uri().required(),
});
const postSchema = Joi.object({
  title: Joi.string().min(3).max(10).required(),
  body: Joi.string().required(),
});
module.exports = {
  signupSchema,
};
