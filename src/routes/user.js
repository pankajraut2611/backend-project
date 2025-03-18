import express from "express";
import db from "../db/index.js";
import jsonwebToken from 'jsonwebtoken' ;
import dotenv from 'dotenv' ;
dotenv.config(); 
const router = express.Router();


//register Api
router.post("/register", (req, res) => {
  const { name, contactNumber, email, password } = req.body;
  const sql = `SELECT * FROM user WHERE email = ?`;
  db.query(sql, [email], (err, result) => {
    if (!err) {
      if (result.length == 0) {
        const insertsql = `INSERT INTO user(name , contactNumber , email , password, status , role) VALUES(?,?,?,?,'false','user')`;
        db.query(insertsql,[name, contactNumber, email, password], (err, result) => {
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json({
                  message: "Successfully update your record..",
                });
            }
        });
      } else {
        res.status(400).json({
          message: "email allready exits",
        });
      }
    } else {
      console.log(err);
    }
  });
});

//login Api
router.post("/login", (req, res) => {
    const {email , password} = req.body;
    const sql = `SELECT email, password , role , status FROM user WHERE email = ?` ;
    db.query(sql , [email] , (err , result)=>{
        if(!err){
            console.log('result ----> ',result);
            if(result.length == 0 || result[0].password != password){
                res.json({ message : 'inncorrect email or password'}) ; 
                return ; 
            }else if(result[0].status == 'false'){
                res.json({ message : 'please wait for admin approval'}) ; 
                return ;             
            }else if(result[0].password == password){
                  const user = {email : result[0].email , role : result[0].role}
                  const Access_Token = jsonwebToken.sign(user , process.env.SECRET_KEY , {expiresIn : '8h'}); 
                  res.json({token : Access_Token });
                  return;
            }            
        }else{
            res.status(500).json({
                message : 'something went wrong'
            })
        }
    })
})

export default router;
