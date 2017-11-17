const mysql = require('mysql');

let env = "dev";
const config = require('./database.json')[env];
const connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
});

connection.connect( err => {
    if(!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");
    }
});

// create DB and table
connection.query('CREATE DATABASE IF NOT EXISTS DB_vinditek', err => {
    if (err) throw err;
    connection.query('USE DB_vinditek', err => {
        if (err) throw err;
        connection.query(`CREATE TABLE IF NOT EXISTS EE_class(
            id INT NOT NULL AUTO_INCREMENT,
            PRIMARY KEY(id),
            weight FLOAT(10),
            co2 FLOAT(10),
            co2RefValue FLOAT(10),
            deviation FLOAT(10),
            created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP 
            )`, err => {
            if (err) throw err;
        });
    });
});


module.exports = connection;