const express = require('express');
const morgan = require('morgan');
const app = express();

// morgan will call next function api routes to log and doesn't
//  return anything and node.js continues to work on next part 


app.use(morgan('dev'));

const productRoutes = require('./api/routes/products');

const orderRoutes = require('./api/routes/orders');

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