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
 
  // check if input is present
  if (!req.body.name || !req.body.email) {
    res
      .status(400)
      .send('name and email are required');
    return;
  }

  // check if email already exists
  if (req.body.email) {
    const query = `SELECT * FROM users WHERE email = $1`;
    const values = [req.body.email];
    db.query(query, values)
      .then(data => {
        const users = data.rows;
        if (users.length > 0) {
          res
            .status(400)
            .send('email already exists');
          return;
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  }
 
  // create a new user
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

  req.cookies.user_email = req.body.email; // set user_email cookie to the email
  res.redirect('/index'); // send the user to the index page
}); 

module.exports = router;
