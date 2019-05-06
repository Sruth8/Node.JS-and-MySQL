var mysql = require('mysql');
var inquirer = require('inquirer');

var conncection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "19Free-19",
    database: "bamazon"
})

conncection.connect(function(err){
    if (err) throw err;
    console.log("connection good!");
})