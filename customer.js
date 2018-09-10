var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');

var idArray = [];

var itemprice = 0;
 

// Setting up the connection to the MySQL db;
var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "Gordon@9",
    database: "bamazon"
});


// connecting to MySQL db, call back function to throw any errors
connection.connect( function (error){
    if (error) throw error;
    console.log("connected as id " + connection.threadId + "\n");
    startBamazon();
});

// this function queries the db bringing back all products, it then runs the choose function that lets the user start shopping
function startBamazon() {
    console.log("//////////----" + "  WELCOME TO BAMAZON!  " + "----\\\\\\\\\ ");
    connection.query("SELECT * from products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            idArray.push(res[i].item_id);
        }
        console.table(res);
        console.log("----------------------------------");
        choose();
    });
};


function choose(){
    console.log("//////////----" + "  Please Select the item you wish to purchase by ID#  " + "----\\\\\\\\\ ");
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "What is the ID of the product you would like to buy?"
        }]).then(answers => {
            if (!isNaN(answers.id)) {
                let numberValue = parseInt(answers.id);
                if (idArray.includes(numberValue)) {
                    console.log("\n\nHere is your item!" + "\n-------------------------------");
                    connection.query("SELECT * from products WHERE item_id = " + answers.id, function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        console.log("\n--------------====================-----------------");
                        let id = numberValue;
                        itemprice = res[0].item_price
                        quantity(id);
                    });
                } else {
                    console.log("\n\n  That ID does not match a product in our system. Please try again.\n\n");
                    choose();
                }
            } else {
                console.log("\n\n  Not a valide choice please enter in an ID number.\n\n");
                choose();
            }
        });
}

function quantity(id){
    console.log("//////////----" + "  How many would you like to buy?  " + "----\\\\\\\\\ ");
    inquirer.prompt([
        {
            type: "input",
            name: "quantity",
            message: "How many of this item would you like?"
        }
    ]).then(answers => {
        var parsedInt = parseInt(answers.quantity);
        connection.query("SELECT stock_quantity from products WHERE item_id = " + id, function (err, res) {
            if (err) throw err;
            if (!isNaN(answers.quantity)) {
                if (parsedInt <= res[0].stock_quantity) {
                   let inStock = res[0].stock_quantity;
                   let request = answers.quantity;
                    checkout(inStock, request, id);
                } else {
                    console.log("I'm sorry, we do not have that many of your requested item in stock! Please try again!\n");
                    quantity(id);
                }
            } else {
                console.log("\n\n  You did not put in a number, please fix this and try again\n\n");
                quantity(id);
            }
        });
    });
};



function checkout(stock, request, id) {
    console.log("Thank you for your purchase!");
    const query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: stock - request
            },
            {
                item_id: id
            }
        ],
        function () {
            const totalPrice = itemprice * request;
            const result = (Math.round(totalPrice * 100) / 100).toFixed(2);
            console.log(`\nThe total price of your purchase is $${result}.\nHave a fantastic day!`);
            connection.end();
        });
}