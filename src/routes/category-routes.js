'use strict';

const express = require('express');
const router = express.Router();

const Categories = require('../models/categories/categories.js');
const categories = new Categories();

/**
 * Get an object of the result count and a list of categories.
 * @route GET /categories
 * @returns {object} 200 { count: 2, results: [ {}, {} ] }
 * @returns {Error}  500 - Server error
 */
router.get('/', getCategories);

/**
 * Create a category and return the created record.
 * @route POST /categories
 * @returns {object} 200 - A category object
 * @returns {Error}  500 - Server error
 */
router.post('/', postCategories);

/**
 * Get a category matching the given id.
 * @route GET /categories/:id
 * @returns {object} 200 - A category object
 * @returns {Error}  500 - Server error
 */
router.get('/:id', getCategory);

/**
 * Update the category with the matching id.
 * @route PUT /categories/:id
 * @returns {object} 200 - A category object
 * @returns {Error}  500 - Server error
 */
router.put('/:id', putCategories);

/**
 * Delete the category matching the id.
 * @route DELETE /categories/:id
 * @returns {object} 200 - A category object
 * @returns {Error}  500 - Server error
 */
router.delete('/:id', deleteCategories);

function getCategories(request,response,next) {
  // expects an array of object to be returned from the model
  categories.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function getCategory(request,response,next) {
  // expects an array with the one matching record from the model
  categories.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

function postCategories(request,response,next) {
  // expects the record that was just added to the database
  categories.create(request.body)
    .then( result => response.status(201).json(result) )
    .catch( next );
}

function putCategories(request,response,next) {
  // expects the record that was just updated in the database
  categories.update(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function deleteCategories(request,response,next) {
  // Expects no return value (resource was deleted)
  categories.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;
