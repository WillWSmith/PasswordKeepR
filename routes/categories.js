/*
 * All routes for Categories are defined here
 * Since this file is loaded in server.js into /categories,
 *   these routes are mounted onto /categories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getCategories } = require('../db/queries/categories');

router.get('/index', (req, res) => {
  console.log("Route accessed: /index");
  getCategories()
    .then(categories => {
      console.log('Categories:', categories)
      res.render('index', { categories: categories });
    })
    .catch(err => {
      console.error('Error getting categories:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
}); 

router.get('/fetch-categories', (req, res) => {
  getCategories()
    .then(categories => {
      res.json({ categories });
    })
    .catch(err => {
      console.error('Error fetching categories:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;