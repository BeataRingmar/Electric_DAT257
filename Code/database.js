const express = require('express');
const app = express();
const mysql=require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const dbCon = mysql.createConnection({
    //The password and user might be different for you. I do not have a password that's why it is in comment.
    //Please only change this part locally, otherwise we'll all have to update it at each git pull.
    //password:"",
    user : 'root',
    host : 'localhost',
    port : '3306',
    database : 'electric'
    
});

dbCon.connect(function(error){
    //query SQL
    if(error) throw error;
    console.log('Database connected successfully !');
});


app.get("/bathrooms", (req,res) => {
    dbCon.query("SELECT * FROM toilets", (error,result) => {
        if (error){
            console.log(error)
        } else {
            res.send(result)
        }
    });
});

// set port & listen for requests
const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
});

module.export = dbCon;