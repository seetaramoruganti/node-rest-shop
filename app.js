const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

// morgan will call next function api routes to log and doesn't
//  return anything and node.js continues to work on next part 


app.use(morgan('dev'));         // can be called middleware 
app.use(bodyParser.urlencoded({extended:false})); // can be called middleware
app.use(bodyParser.json());

const productRoutes = require('./api/routes/products');

const orderRoutes = require('./api/routes/orders');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept, Authorization"
    );
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', "PUT, PATCH, DELETE, GET, POST");
        return res.status(200).json({});
    }
    next();
})


// routes that we are handling 
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);



app.use((req, res, next )=>{
    const error = new Error('Not found !');
    error.status =404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:error.message
    })
});


module.exports = app;