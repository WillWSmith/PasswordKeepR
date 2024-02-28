const express = require('express');
const router  = express.Router();

// do this instead
router.post('/login', (req, res) => {
  const email = req.body.email;
 
  // or using plain-text cookies, set to user's email
  res.cookie('user_email', req.body.email);

  // send the user somewhere
  res.redirect('/index');
});
