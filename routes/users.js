/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Get the users page to create new user
router.get('/', (req, res) => {
  const user_email = req.cookies.user_email; // get user_email from cookie
  const query = `
    SELECT organizations.name as organization_name, users.name as user_name
    FROM organizations
    JOIN users ON users.id = organizations.user_id
    WHERE organizations.user_id = (SELECT id FROM users WHERE email = $1)`;
  const values = [user_email];

  db.query(query, values)
    .then(data => {
      console.log(data.rows);

      const organization_name = data.rows[0].organization_name;
      const user_name = data.rows[0].user_name;
      const templateVars = { user_email, organization_name, user_name };

      // render the users page to create new user
      res.render('users', templateVars);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});


router.post('/', (req, res) => {
 
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
  const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
  const values = [req.body.name, req.body.email, req.body.password];

  db.query(query, values)
    .then(data => {
      console.log(data.rows);
      res.redirect('/index'); // send the user to the index page
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
}); 

module.exports = router;
