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

module.exports = app;