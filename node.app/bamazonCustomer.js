var mysql = require('mysql');
var inquirer = require('inquirer');

var sqlconnect = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
})

//this code is to see if it's connected to MySQL database
sqlconnect.connect(function (error) {
    if (error) throw error;
    console.log("Connection good!");
    getSqlTable();
})

// this is where I try to connect the table so it can printed out in my termial 
var getSqlTable = function () {
    sqlconnect.query("SELECT * FROM products ", function (error, response) {

        //this for loop helps loop through the items in the database 
        for (var d = 0; d < response.length; d++) {

            console.log(response[d].item_id + " - " + response[d].product_name + " - " +
                response[d].department_name + " - " + response[d].price + " - " +
                response[d].stock_quantity);
        }
        // need to set this so the user can select and buy an item from the list
        buyer(response);
    })
}

// this code suppose to 
var buyer = function (response) {
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "Buying something? Choose from the Wish list? [Stop with S]"
    }]).then(function (result) {
        var target = false;
        // another for loop that wil loop through the items to find what the customer wants to buy
        for (var d = 0; d < response.lenght; d++) {
            // if the item you put in is in the loop then it will select it
            if (response[d].product_name === result.choice) {
                // here it is suppose to set it
                target = true;
                // here is where the item goes into a varible and  then
                var product = result.choice;
                // this will set the identification of the item that was selected from the array 
                var description = d;
                //here needs to be an inq
                inquirer.prompt({
                    type: "input",
                    name: "batch",
                    message: "Amount: ",
                    validate: function (val) {
                        if (isNaN(val) === false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function (result) {
                    if ((response[description].stock_quantity - result.batch) > 0) {
                        sqlconnect.query("UPDATE products SET stock_quantity =" + (response[description].stock_quantity -
                            result.batch) + " Where product name = " + product + " ", function (error, response) {
                                console.log("Product Purchased");
                                getSqlTable();
                            })
                    } else {
                        console.log("Not Valid!");
                        buyer(response);
                    }
                })
            }
        }
    })
}

// code needs to say Insufficient quantity!

// look online for ways to oringize my my code 