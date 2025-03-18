import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import db from './db/index.js';
// routes 
import routers from './routes/user.js'
const app = express();


// body-parser
import bodyParser from 'body-parser';
// Parse JSON requests
app.use(bodyParser.json());
// Parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routers);

app.listen(process.env.PORT , ()=>{
    console.log(`app running ${process.env.PORT}`);
})



/**
 
  app.get('/api', (req, res) => {    
    db.query('SELECT * FROM my_tab', (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(500).send('Error fetching users');
        return;
      }
      console.log(results);
      res.json(results);
    });
});


app.post('/register' , (req , res)=>{
    const {name , age , experience , mobile} = req.body ; 
    db.query('INSERT INTO DETAIL(name, age, experience , mobile) VALUES(?,?,?,?)', [name , age , experience, mobile] , (err , result)=>{
        if(err){
            console.error('Error executing query: ' + err.stack);
            return ; 
        }
        res.status(200).json({
            message : 'succesfully update'
        })
    })
});

app.put('/update' , (req , res)=>{
    const { name , experience , age , mobile } = req.body ; 
    const sql = `UPDATE DETAIL SET name = ? , experience = ? , age = ? WHERE mobile = ?` ; 
    db.query(sql, [name, age, mobile] , (err , result)=>{
        if(err){
            console.log(err);
            return ; 
        }
        console.log('update response ---> ',result);
        res.json({
            mesaage : 'successfully updated!',
        })
    })
});

app.delete('/delete' , (req , res)=>{
    const { name , experience , age , mobile } = req.body ; 
    const sql = `UPDATE DETAIL SET name = ? , experience = ? , age = ? WHERE mobile = ?` ; 
    db.query(sql, [name, age, mobile] , (err , result)=>{
        if(err){
            console.log(err);
            return ; 
        }
        console.log('update response ---> ',result);
        res.json({
            mesaage : 'successfully updated!',
        })
    })
});

 */