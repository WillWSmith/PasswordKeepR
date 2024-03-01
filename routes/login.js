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

module.exports = router;
