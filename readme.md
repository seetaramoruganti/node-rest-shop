used packages - Nodemon, bodyParser, morgan 
    Nodemon - used for auto restarting the server
        npm install --save nodemon 
            package.json - add script as start: "nodemon server.js"
    bodyParser- used for JSON response methods and functions
        npm install --save bodyparser
    morgan - logging 
        npm install --save morgan

Database - MongoDB Atlas - Database as service by MongoDB - free tire 
    database name - node-rest-shop 

    or in this project i use mongoose package for better 
        - mongooose works with schemas, and models

            const mongoose = require("mongoose");
            const productSchema = mongoose.Schema({
            _id: mongoose.Types.ObjectId,
            name: String,
            price: Number,
            });
            module.exports = mongoose.model("Product", productSchema);
