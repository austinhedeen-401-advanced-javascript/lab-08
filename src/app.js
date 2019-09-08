'use strict';
/**
 * @module
 */

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require( './middleware/error.js');
const notFound = require( './middleware/404.js' );

// Routes
const categoryRoutes = require('./routes/category-routes.js');
const productRoutes = require('./routes/product-routes.js');

// Prepare the express app
const app = express();

const expressSwagger = require('express-swagger-generator')(app);
expressSwagger(require('../docs/config/swagger.js'));

app.use('/docs', express.static('./docs'));

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,

  /**
   * Starts the server at the given port.
   * @param port
   */
  start: (port) => app.listen(port, () => console.log(`Server up on port ${port}`) ),
};
