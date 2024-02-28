/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');


router.post('/users', (req, res) => {
  const query = `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`;
  const values = [req.body.name, req.body.email];
  
  console.log(query, values);

  db.query(query, values)
    .then(data => {
      const users = data.rows;
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  req.cookies.user_id = req.body.email; // set the user_id cookie to the email
  res.redirect('/index'); // send the user to the index page
}); 

module.exports = router;
