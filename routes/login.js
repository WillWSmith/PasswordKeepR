const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

// router.get('/', (req, res) => {
//   const user_email = req.cookies.user_email; 
//   const templateVars = { user_email };
 
//   if (!user_email) {
//     return res.redirect('/login');
//   }
//   res.render('login', templateVars);
// });


// Login
router.post('/login', (req, res) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const values = [req.body.email];
  
  db.query(query, values)
    .then(data => {
      const email = data.rows[0];
      
      if (email === req.body.email) {
        res.cookie('user_email', req.body.email);
        res.redirect('/index');
  
      } else {
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
