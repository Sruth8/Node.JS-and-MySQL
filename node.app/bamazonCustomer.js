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

        //this for loop helps loop through the items in the database and print out the items
        for (var d = 0; d < response.length; d++) {

            console.log(response[d].item_id + " - " + response[d].product_name + " - " +
                response[d].department_name + " - " + response[d].price + " - " +
                response[d].stock_quantity);
        }
        // need to set this so the user can select and buy an item from the list
        buyer(response);
    })
}

// this code suppose to promt customer to buy an item from the list
var buyer = function (dbData) {
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "Buying something? Choose the item ID from the Wish list? [Stop with s]"
    }]).then(function (result) {
        // var target = false;
        if (result.choice === "s") { //this prompts the customer to "Stop" the program by pressing "s"
            process.exit()
        }

        var product = returnItem(dbData, result.choice);
        //console.log(product)
        quantity(product)

        // if (d === response.length && target) {
        //     console.log("Invalid! Item not in this list");
        //     buyer(response);
        // }
        
    })
}

var returnItem = (dbData, choiceId) => {
        // because I need to pratice for loops, this for loops through the items to find what the customer wants to buy
        for (var d = 0; d < dbData.length; d++) {
            // if the item you put in is in the loop then it will select it
            if (dbData[d].item_id == choiceId) {
                // here it is suppose to set it
                //target = true;
                // here is where the item goes into a varible d
                return dbData[d];
                // this will set the identification of the item that was selected from the array 
                // var description = d;
                
            } 
        }
        return null;
}

var quantity = (item) => {
    inquirer.prompt({
        type: "input",
        name: "batch",
        message: "Amount: ", //here we need to prompt how many items the customer wants to buy
        // this is the function that will substract from the amount in stock item the customer chooses to buy 
       // isNaN function determines whether a value is Not-A-Number or not. 
        validate: function (val) {
            if (isNaN(val) === false) {
                return true;
            } else {
                return false;
            }
        } // this will update the item in stock to show in the console.log that the item was removed as a purchase
    }).then(function (result) {

        // turn inquierer string into usable integer for math
        var amount = parseInt(result.batch)
        // Check if there's enough inventory
        if ((item.stock_quantity - amount) > 0) {
            
            // Two ?? is for table names, ? for table values in my query. My tutor showed me this piece of code
            var sqlQuery = `UPDATE ?? 
                            SET stock_quantity = stock_quantity - ?
                            WHERE product_name =  ?`

            // pass query string into query, then pass values that match with the ? marks
            sqlconnect.query(sqlQuery, ["products", amount, item.product_name], function (error, response) {
                    // Inform of errors
                    if (error) throw error
                    // Inform of success
                    console.log("Product Purchased");
                    // restart table
                    getSqlTable();
                })
        } else {  // code needs to say Insufficient quantity!
            console.log("Insufficient quantity!");
            buyer(dbData);
        }
    })
}



// look online for ways to oringize my my code 