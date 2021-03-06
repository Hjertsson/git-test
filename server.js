const { 
    filterCustomer, 
    randomize, 
    removeAllCustomers, 
    removeCustomer} = require("./serverFunctions"); 

const express = require("express");
const {use} = require("express/lib/application");


const app = express();
const port = 1700;

//Tells express to use ejs to render html
app.set("view engine", "ejs");

//lets express know ho to interpret the data
app.use(express.urlencoded({extended: true}));

const tempdb = require("./tempdb");
let db = tempdb.tempDB;

app.use("/", express.static("public"));


app.get("/fullList", function(req, res){
    res.render("pages/fullList", {customers: db["customers"]});
})

/**
 * The function that adds a new customer
 * adds @firstName @lastName @customerId @phoneNumber to a array @dbToAdd
 * if statement to make sure the customer ID is connected to customers spot in the array
 * if true it adds the new customer to the array
 * if not true, error
 */

app.post("/addCustomer", function(req, res) {
    let firstName = req.body["firstName"];
    let lastName = req.body["lastName"];
    let customerID = Number(req.body["customerID"]);
    let phoneNumber = Number(req.body["phoneNumber"]);

    let dbToAdd = {
        "firstName": firstName,
        "lastName": lastName,
        "customerID": customerID,
        "phoneNumber": phoneNumber
    };
    

    if(customerID > db["customers"].length + 1 || customerID < db["customers"].length -1)
    {
        //window.alert('Illegal use of cutomerID')
        
    }
    else {
        db["customers"].push(dbToAdd);
        
        res.render("pages/confirmed");
        //res.send("added"); 
        //window.alert('added');
    }      
})

/**
 * The function that edits customer
 * adds @firstName @lastName @customerId @phoneNumber to a list @dbToAdd
 * The id the user inputs is used to remove the customer, -1 due to array starting at 1
 * After the customer is removed, it is replaced by the edited version through .push
 */
 
app.post("/editCustomer", function(req,res) {
    let firstName = req.body["firstName"];
    let lastName = req.body["lastName"];
    let customerID = Number(req.body["customerID"]);
    let phoneNumber = Number(req.body["phoneNumber"]);

    let dbToAdd = {
        "firstName": firstName,
        "lastName": lastName,
        "customerID": customerID,
        "phoneNumber": phoneNumber
    };

    db["customers"].splice(customerID -1, 1, "empty");

    db["customers"].push(dbToAdd);

    //res.send("Edited");
    //window.alert('Edited');
    res.render("pages/confirmed");
})

app.get("/randomize", function(req, res) {

    if(db["customers"].length > 0)
    {
    let randomized = randomize(db);
    res.render("pages/randomize", {randomized: randomized});
    }
    
    else{
        //res.send("Not enough customers in the database");
        //window.alert('Not enough customers in the database');
        
    }
    
});





/**
 * Removes specified customer
 * Recieves the id from the user
 * sends the database and the users input to the removeCustomer() function
 */




app.post("/removeCustomer", function(req,res) {
    let customerID = req.body["customerID"];

    removeCustomer(customerID, db);
    //window.alert('The customer has been removed!')
    //res.send("Removed");
    res.render("pages/confirmed");
})


/**
 * Removes all customers
 * Gets called by the index, send the Array that contains the database to the removeAllFunction.
 * returns a ("database cleared") message.
 */


app.get("/removeAllCustomers", function(req,res) {

   removeAllCustomers(db);

   //res.send("Database cleared");
   //window.alert('All customers has removed!');
   res.render("pages/confirmed");
})


/**
 * Recieves the users input, designates it to customerID.
 * sends this information to the filterCustomer() function
 * renders through the filterCustomers.ejs file
 */


app.get("/filterCustomer", function(req,res) {
    let customerID = Number(req.query["filterCustomer"]);

    let customers = filterCustomer(db, customerID);
    res.render("pages/filterCustomers", {
        customerID: customerID,
        customers: customers
    });
})


/**
 * Recieves the database and the users input, using the splice() function, it removes the object on the deisred index
 * in order not to ruin the array + customerID syncronisation, it replaces the array with an "empty" string.
 * 
 * @param {Number} customerID - The users input, and is the index of the customer that is to be removed
 * @param {*} db - The array that contains the customer database
 */

/*
function removeCustomer(customerID, db)
{
    db["customers"].splice(customerID - 1, 1, "empty");
}
*/

/**
 * The function goes through the database and removes every index of the array
 * using the lenght of said array and the splice() function.
 * @param {Array} db - The array that contains the customer database
 */

/*
function removeAllCustomers(db)
{
    db["customers"].splice(0, db["customers"].length);
}
*/

/**
 * @param {Array} db - The array that contains the customer database
 * @param {Number} customerID - the number the user wanted to search with
 * @param {Array} filteredCustomer - A temporary Array created within the function that saves and returns the desired information
 * @returns The function returns the object with the same "customerID" as the one the users input
 */

/*
function filterCustomer(db, customerID) {

    let filteredCustomer = [];
    for(const customer of db["customers"]){
        if(customer["customerID"] === customerID){
            filteredCustomer.push(customer);
        }          
    }
    
   return filteredCustomer;
}
*/

/**
 * using math.floor(math.random()), and the lenght of the array, the math function randomizes an integer between 0 and the lenght of the array
 * 
 * @param {Array} db - The array that contains the customer database
 * @param {Array} randomizedCustomer - A temporary array that is created and only used withing the function
 * @returns it returns the object on the randomized index, ensuring the returned index isn't a negtive value.
 */

/*
function randomize(db){
    let randomizedCustomer = [];
    randomizedCustomer = db["customers"];
    
    let rndIdx = Math.floor(Math.random() * randomizedCustomer.length + 1);

    if(rndIdx - 1 > -1){
        return randomizedCustomer[rndIdx -1];
    }else{
        return randomizedCustomer[rndIdx];
    }
}
*/



app.listen(port, function() {
    console.log("Server started")
});

/*
module
.exports = {
    filterCustomer,
    randomize,
    removeAllCustomers,
    removeCustomer   
}
*/

