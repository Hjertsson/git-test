const express = require("express");
const { filterCustomer, randomize, removeAllCustomers, removeCustomer} = require("./server");

test("filterCustomer Test 1", function(){
    filteredCustomer = [];
    let dbFiltered = {
        "customers":
            [
                { "firstName1": "first1", "lastName": "last1", "customerID": 1, "phoneNumber": 11111 },
                { "firstName2": "first2", "lastName2": "last2", "customerID": 2, "phoneNumber": 222222 },
                { "firstName3": "first3", "lastName3": "last3", "customerID": 3, "phoneNumber": 33333 }
            ]
    };  

    filteredCustomer.push(filterCustomer(dbFiltered, 1));

    expect(filteredCustomer.length).toBe(1);

    //Test 1 confirms that if the function filterCustomer recieves an array with 3 objects, it returns 1
})

test("filterCustomer Test 2", function () {
    filteredCustomer = [];
    let dbFiltered = {
        "customers":
            [
                { "firstName1": "first1", "lastName": "last1", "customerID": 1, "phoneNumber": 11111 },
                { "firstName2": "first2", "lastName2": "last2", "customerID": 2, "phoneNumber": 222222 },
                { "firstName3": "first3", "lastName3": "last3", "customerID": 3, "phoneNumber": 33333 }
            ]
    };  
    for (i = 0; i < 3; i++)
    {
        filteredCustomer.push(filterCustomer(dbFiltered, i))
    }
    expect(filteredCustomer.length).toBe(3);

    //Test 2 confirms if you do test 1 but want 3 filtered customers it returns 3 object
});

test("randomize Test 1", function(){
    randomResult = [];
    let dbRandom = {
        "customers":
            [
                { "firstName1": "first1", "lastName": "last1", "customerID": 1, "phoneNumber": 11111 },
                { "firstName2": "first2", "lastName2": "last2", "customerID": 2, "phoneNumber": 222222 },
                { "firstName3": "first3", "lastName3": "last3", "customerID": 3, "phoneNumber": 33333 }
            ]
    }

    randomResult.push(randomize(dbRandom));
    expect(randomResult.length).toBe(1);

    //Test 1 confirms if the function randomize() recives an array with 3 objects, it returns with 1 randomized object
});

test("randomize Test 2", function(){  
    randomResult = [];
    let dbRandom = {
        "customers":
            [
                { "firstName1": "first1", "lastName": "last1", "customerID": 1, "phoneNumber": 11111 },
                { "firstName2": "first2", "lastName2": "last2", "customerID": 2, "phoneNumber": 222222 },
                { "firstName3": "first3", "lastName3": "last3", "customerID": 3, "phoneNumber": 33333 }
            ]
    } 
    
    for(i = 0; i < 100; i++){
        randomResult.push(randomize(dbRandom));
        expect(randomResult.length).toBe(1);
        randomResult.splice(0, randomResult.length);    
    }

    //test 2 confirms that if you did this 100 times it will randomize all 100 different instances
    //However, the function itself doesn't empty the information after it's used, so and extra step is needed to empty array before new randomization
})

test("removeAll customers test 1", function(){
    let dbRemove = {
        "customers":
            [
                {"firstName1": "first1", "lastName": "last1", "customerID": 1, "phoneNumber": 11111 }            
            ]
    }
    expect(dbRemove["customers"].length).toBe(1);
    
    removeAllCustomers(dbRemove);

    expect(dbRemove["customers"].length).toBe(0);

    //test 1 confirms that if the function removeAllCustomers recieves an database with 1 customer it returns an array with 0 objects
});

test("removeAll customers test 2" , function(){
    let dbRemove = {
        "customers":
            [
                {"firstName1": "first1", "lastName": "last1", "customerID": 1, "phoneNumber": 11111 },
                { "firstName2": "first2", "lastName2": "last2", "customerID": 2, "phoneNumber": 222222 },  
                { "firstName3": "first3", "lastName3": "last3", "customerID": 3, "phoneNumber": 33333 }         
            ]
    }
    expect(dbRemove["customers"].length).toBe(3);
    
    removeAllCustomers(dbRemove);

    expect(dbRemove["customers"].length).toBe(0);

    //test 2 confirms the same as test 1, but with more objects in the database, it still returns with 0
})

test("removeAll customers test 3", function(){
    let dbRemove = {
        "customers":
            [
                {"firstName1": "first1", "lastName": "last1", "customerID": 1, "phoneNumber": 11111 },
                { "firstName2": "first2", "lastName2": "last2", "customerID": 2, "phoneNumber": 222222 },  
                { "firstName3": "first3", "lastName3": "last3", "customerID": 3, "phoneNumber": 33333 }         
            ],
        "test variable": 
        [
                {"firstName1": "first1", "lastName": "last1", "customerID": 1, "phoneNumber": 11111 },
                { "firstName2": "first2", "lastName2": "last2", "customerID": 2, "phoneNumber": 222222 },  
                { "firstName3": "first3", "lastName3": "last3", "customerID": 3, "phoneNumber": 33333 }
        ]
    }

    expect(dbRemove["customers"].length).toBe(3);

    removeAllCustomers(dbRemove);

    expect(dbRemove["customers"].length).toBe(0);
    expect(dbRemove["test variable"].length).toBe(3);   

    //test 3 confirms that it is only the object named "customers" that are removed from the database,
    //if another object is created, it doesn't get removed and still exists.
})

test("removeAll customers test 4", function(){
    let dbRemove = {
        "customers":
        [
            {"Test": "testname1", "Test": "testlastname", "testNumber": 1, "testNumber2": 1},
            {"11111": "testname2", "11111": "testlastname", "testNumber2": 2, "testNumber2.2": 2},
            {"0s0s0s0": "testname3", "0s0s0s0s": "testlastname", "testNumber3": 3, "testNumber2.3": 3}
        ]
    }
    expect(dbRemove["customers"].length).toBe(3);

    removeAllCustomers(dbRemove);

    expect(dbRemove["customers"].length).toBe(0);

    //Test 4 confirms that the name of the variables that get sent to removeAllCustomers does not matter
    //As longa as the object is named "customers" the function will empty the database
})

test("removeAll customers 5", function(){
    let dbRemove = {
        "customers":
        [
            {"test": "testname1"},
            {"test": "testname1", "test": "testLast1"},
            {"test": "testname1", "test": "testLast1", "testNumber": 1},
            {"test": "testname1", "test": "testLast1", "testNumber": 1, "testnumber2": 2},
            {"test": "testname1", "test": "testLast1", "testNumber": 1, "testnumber2": 2, "extra": "extra"},
            {"test": "testname1", "test": "testLast1", "testNumber": 1, "testnumber2": 2, "extra": "extra", "extra2": "extra2"},
        ]
    }
    expect(dbRemove["customers"].length).toBe(6);

    removeAllCustomers(dbRemove);-

    expect(dbRemove["customers"].length).toBe(0);

    //Test 5 confirms that the lenght or size of the array doesn not matter either, the functions only requirement is that the object is named "customer"
})

test("removeCustomer test 1", function(){
    let dbRemove = {
        "customers":
            [
                {"firstName1": "first1", "lastName": "last1", "customerID": 1, "phoneNumber": 11111 },
                { "firstName2": "first2", "lastName2": "last2", "customerID": 2, "phoneNumber": 222222 },  
                { "firstName3": "first3", "lastName3": "last3", "customerID": 3, "phoneNumber": 33333 }         
            ]
    }
    expect(dbRemove["customers"].length).toBe(3);

    removeCustomer(1, dbRemove);

    expect(dbRemove["customers"].length).toBe(3);

    // The test confirms that while the function does what it is supposed to do in the front end, i.e removes the visible information
    // the array doesn't get smaller, and is only replaces by a non visible "empty"
})

test("removeCustomer test 2", function(){
    let dbRemove = {
        "customers":
            [
                {"firstName1": "first1", "lastName": "last1", "customerID": 1, "phoneNumber": 11111 },
                { "firstName2": "first2", "lastName2": "last2", "customerID": 2, "phoneNumber": 222222 },  
                { "firstName3": "first3", "lastName3": "last3", "customerID": 3, "phoneNumber": 33333 }         
            ]
    }
    expect(dbRemove["customers"].length).toBe(3);

    removeCustomer(4, dbRemove)

    expect(dbRemove["customers"].length).toBe(4);

    //To build on test 1, an issue that occurs is that if the input of "remove" is larger than the database, it creates a new object and it is set as a non visible "empty"
})

test("removeCustomer test 2", function(){
    let dbRemove = {
        "customers":
            [
                {"firstName1": "first1", "lastName": "last1", "customerID": 1, "phoneNumber": 11111 },
                { "firstName2": "first2", "lastName2": "last2", "customerID": 2, "phoneNumber": 222222 },  
                { "firstName3": "first3", "lastName3": "last3", "customerID": 3, "phoneNumber": 33333 }         
            ]
    }
    expect(dbRemove["customers"].length).toBe(3);

    for(i = 0; i < 100; i++){
        removeCustomer(i, dbRemove);
    }
    expect(dbRemove["customers"].length).toBe(99);


    //to build further, this will happen no matter how many iterations.
})
