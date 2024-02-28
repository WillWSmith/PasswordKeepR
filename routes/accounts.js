/*
 * All routes for Accounts are defined here
 * Since this file is loaded in server.js into /accounts,
 *   these routes are mounted onto /accounts
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// Add New Account Route

router.get('/new-account', (req, res) => {
  res.render('new-account');
}); 

module.exports = router;