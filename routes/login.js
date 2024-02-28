const express = require('express');
const router  = express.Router();


router.get('/', (req, res) => {
  const user_email = req.cookies.user_email; 
  const templateVars = { user_email };
 
  if (!user_email) {
    return res.redirect('/login');
  }
  res.render('login', templateVars);
});


// Login
router.post('/login', (req, res) => {
  const user_email = req.body.user_email;
 
  if (!user_email) {
    return res.status(400).send('email is required');
  }
  // or using plain-text cookies, set to user's email
  res.cookie('user_email', req.body.user_email);

  // send the user somewhere
  res.redirect('/index');
});
