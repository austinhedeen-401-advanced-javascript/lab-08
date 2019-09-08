'use strict';

const Model = require('../mongo');
const schema = require('./categories-schema');

/**
 * Class representing a Category.
 * @extends Model
 */
class Categories extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Categories;
