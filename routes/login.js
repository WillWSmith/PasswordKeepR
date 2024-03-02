const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  const user_email = req.cookies.user_email;
  const templateVars = { user_email };

  if (user_email) {
    res.redirect('/index');
  } else {
    res.render('login', templateVars);
  }
});
 
// If user logs in, render data to _header.ejs for user_email, organizations, and users 
router.get('/', (req, res) => {
  const user_email = req.cookies.user_email;
  const query = `
    SELECT organizations.name, users.name
    FROM organizations
    JOIN users ON users.id = organizations.user_id
    WHERE organizations.user_id = (SELECT id FROM users WHERE email = $1)`;
  const values = [user_email];

  db.query(query, values)
    .then(data => {
      const organization_name = data.rows[0].organization_name;
      const user_name = data.rows[0].user_name;
      const templateVars = { user_email, organization_name, user_name };
      
      res.render('_header', {templateVars});
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});


router.post('/login', (req, res) => {
  const query = `SELECT * FROM users WHERE email = $1 AND password = $2`;
  const values = [req.body.email, req.body.password];

  db.query(query, values)
    .then(data => {
      if (data.rows.length > 0) {
        // if user with email and password found, set user_email cookie
        res.cookie('user_email', req.body.email);
        res.redirect('/index'); // Redirect only if login is successful
      } else {
        // no user found with email and password
        res.status(401).send('Unauthorized');
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/logout', (req, res) => {
  res.clearCookie('user_email');
  res.redirect('/');
});

module.exports = router;
