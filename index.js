const cors = require("cors");
const express = require("express");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8888"],
  }),
);
app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }),
);

const port = 8000;
const secret = "mysecret";

let conn = null;

// function init connection mysql
const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "tutorial",
  });
};

/* เราจะแก้ไข code ที่อยู่ตรงกลาง */

app.post("/api/register", async (req, res) => {
  try{
    const { email, password} = req.body;
    const passwordHash = await bcrypt.hash(password, 10)
    const userData = {
      email,
      password: passwordHash,
    }
    const [result] = await conn.query("INSERT INTO users SET ?", userData);
    res.json({
      message : 'insert success',
      result
    });

  }catch (error){
    console.log("error", error);
    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/api/login", async (req, res) => {
  try{
    const { email, password } = req.body;
    const [result] = await conn.query("SELECT * FROM users WHERE email = ?", email);
    const userData = result[0];
    const macth = await bcrypt.compare(password, userData.password);
    if (!macth) {
      res.status(400).json({
        message: 'login failed (wrong email or password)',
      });
      return false;
    }

    // สร้าง token jwt 
    // const token = jwt.sign({ email, role: "admin" }, secret,{expiresIn: "1h"});
    // res.cookie("token", token, {
    //   maxAge: 300000,
    //   secure: true,
    //   httpOnly: true,
    //   sameSite: "none",
    // });
    req.session.userId = userData.id
    req.session.user = userData

    res.json({
      message : 'login success'
    });



  }catch (error){
    console.log("error", error);
    res.status(401).json({
      message: 'login failed',
      error
    });
  }
});

app.get("/api/users", async (req, res) => {
  try{
    // const authHeader = req.headers["authorization"]
    // const authToken = req.cookies.token
    // let authToken = ''
    // if (authHeader) {
    //   authToken = authHeader.split(" ")[1];
    // }
    // const user = jwt.verify(authToken, secret);
    

    // user มาอย่างถูกต้อง
    // recheck จาก db 

    

    // const [checkResult] = await conn.query("SELECT * FROM users WHERE email = ?", user.email);
    // if (!checkResult[0]){
    //   throw { message: "authentication failed" };
    // };

    if (!req.session.userId){
      throw { message: "authentication failed" };
    }
    console.log(req.session);

    const [result] = await conn.query("SELECT * FROM users");
    res.json({
      message : 'get user success',
      result
    });
  }
  catch (error){
    console.log("error", error);
    res.status(403).json({
      message: 'authentication failed',
      error
    });
  }
})

// Listen
app.listen(port, async () => {
  await initMySQL();
  console.log("Server started at port 8000");
});