import mysql from 'mysql';
import 'dotenv/config';


const connection = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.USER,
    password : process.env.PASSWORD, 
    database : process.env.DATABASE
})

connection.connect((err)=>{
    if (err) {
        console.error('Error connecting:', err.stack);
        return;
    }
    console.log(`Connected mysql Database connection ${connection.threadId}`);
})

export default connection ; 