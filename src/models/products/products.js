'use strict';

const Model = require('../mongo');
const schema = require('./products-schema');

/**
 * Class representing a Product.
 * @extends Model
 */
class Products extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Products;
