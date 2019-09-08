'use strict';

const express = require('express');
const router = express.Router();

const Products = require('../models/products/products');
const products = new Products();

/**
 * Get an object of the result count and a list of products.
 * @route GET /products
 * @returns {object} 200 { count: 2, results: [ {}, {} ] }
 * @returns {Error}  500 - Server error
 */
router.get('/', getProducts);

/**
 * Create a product and return the created record.
 * @route POST /products
 * @returns {object} 200 - A product object
 * @returns {Error}  500 - Server error
 */
router.post('/', postProducts);

/**
 * Get a product matching the given id.
 * @route GET /products/:id
 * @returns {object} 200 - A product object
 * @returns {Error}  500 - Server error
 */
router.get('/:id', getProduct);

/**
 * Update the product with the matching id.
 * @route PUT /products/:id
 * @returns {object} 200 - A product object
 * @returns {Error}  500 - Server error
 */
router.put('/:id', putProducts);

/**
 * Delete the product matching the id.
 * @route DELETE /products/:id
 * @returns {object} 200 - A product object
 * @returns {Error}  500 - Server error
 */
router.delete('/:id', deleteProducts);

function getProducts(request,response,next) {
  // expects an array of objects back
  products.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function getProduct(request,response,next) {
  // expects an array with one object in it
  products.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

function postProducts(request,response,next) {
  // expects the record that was just added to the database
  products.create(request.body)
    .then( result => response.status(201).json(result) )
    .catch( next );
}

function putProducts(request,response,next) {
  // expects the record that was just updated in the database
  products.update(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function deleteProducts(request,response,next) {
  // Expects no return value (the resource should be gone)
  products.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;
