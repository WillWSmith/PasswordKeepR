/*
 * All routes for Accounts are defined here
 * Since this file is loaded in server.js into /accounts,
 *   these routes are mounted onto /accounts
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Add New Account Route

router.get('/new-account', (req, res) => {
  const user_email = req.cookies.user_email; // get user_email from cookie
  const templateVars = { user_email };

  // if user_email is not set, redirect to login
  if (!user_email) {
    return res.redirect('/login');
  }

  // render the new-account page
  res.render('new-account');
}); 

module.exports = router;