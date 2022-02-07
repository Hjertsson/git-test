function removeCustomer(customerID, db)
{
    db["customers"].splice(customerID - 1, 1, "empty");
}

function removeAllCustomers(db)
{
    db["customers"].splice(0, db["customers"].length);
}

function filterCustomer(db, customerID) {

    let filteredCustomer = [];
    for(const customer of db["customers"]){
        if(customer["customerID"] === customerID){
            filteredCustomer.push(customer);
        }          
    }
    
   return filteredCustomer;
}

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



module
.exports = {
    filterCustomer,
    randomize,
    removeAllCustomers,
    removeCustomer   
}