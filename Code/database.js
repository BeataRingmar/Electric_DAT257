const mysql=require('mysql');

const dbCon = mysql.createConnection({
    //The password and user might be different for you. I do not have a password that's why it is in comment.
    //Please only change this part locally, otherwise we'll all have to update it at each git pull.
    //password :'',
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

module.export = dbCon;