const express = require('express');
const router  = express.Router();

// do this instead
router.get('/login/:id', (req, res) => {

  // or using plain-text cookies
  res.cookie('user_id', req.params.id);

  // send the user somewhere
  res.redirect('/:org_id');
});