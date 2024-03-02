/*
 * All routes for Organizations are defined here
 * Since this file is loaded in server.js into /organizations,
 *   these routes are mounted onto /organizations
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/index', (req, res) => {
  const user_email = req.cookies.user_email;

  const query = `
    SELECT organizations.name AS organization_name, users.name AS user_name
    FROM organizations
    JOIN users ON users.id = organizations.user_id
    WHERE organizations.user_id = (SELECT id FROM users WHERE email = $1)`;
  const values = [user_email];

  db.query(query, values)
    .then(data => {
      const organization_name = data.rows[0].organization_name;
      const user_name = data.rows[0].user_name;
      res.render('index', { user_email, organization_name, user_name });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;