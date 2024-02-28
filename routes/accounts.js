/*
 * All routes for Accounts are defined here
 * Since this file is loaded in server.js into /accounts,
 *   these routes are mounted onto /accounts
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');


// get the accounts page
//  -- I feel like this is a SPA with the sort by category functionality?



// Get the new-account page
router.get('/new-account', (req, res) => {
  const user_email = req.cookies.user_email; // get user_email from cookie
  const templateVars = { user_email };

  // if user_email is not logged in, redirect to login
  if (!user_email) {
    return res.redirect('/login');
  }
  // render the new-account page
  res.render('new-account', templateVars);
}); 



// Create a new account
router.post('/new-account', (req, res) => {
  const website = req.body.website;
  const category = req.body.category;
  const username = req.body.username;
  const password = req.body.password;
  
  if (!website || !category || !username || !password) {
    return res.status(400).send('All fields are required');
  }
  if (website.length > 50 || username.length > 50 || password.length > 50) {
    return res.status(400).send('All fields must be less than 50 characters');
  }

  const query = `INSERT INTO accounts (website, category, username, password) VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [req.body.website, req.body.category, req.body.username, req.body.password];
  console.log(query, values);

  db.query(query, values)
    .then(data => {
      const account = data.rows[0];
      res.json({ account });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  
  res.redirect('/index'); // send the user to the index page
});


module.exports = router;