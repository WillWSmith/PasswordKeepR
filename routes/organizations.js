/*
 * All routes for Organizations are defined here
 * Since this file is loaded in server.js into /organizations,
 *   these routes are mounted onto /organizations
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('organizations');
}); 

module.exports = router;