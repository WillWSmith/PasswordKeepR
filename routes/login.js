const express = require('express');
const router  = express.Router();
const db = require('../db/connection');


router.post('/login', (req, res) => {
  const query = `SELECT * FROM users WHERE email = $1 AND password = $2`;
  const values = [req.body.email, req.body.password];
  
  db.query(query, values)
    .then(data => {
      if (data.rows.length > 0) {
        // if user with email and password found
        const user = data.rows[0];
          res.cookie('user_email', req.body.email);
          res.redirect('/index');
  
        } else { // no user found with email and password
          res.status(401).send('Unauthorized');
        }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
 
module.exports = router;
