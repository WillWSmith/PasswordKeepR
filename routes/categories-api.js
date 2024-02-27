/*
 * All routes for Category Data are defined here
 * Since this file is loaded in server.js into api/categories,
 *   these routes are mounted onto /api/organizations
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/categories');

router.get('/', (req, res) => {
  // userQueries.getUsers()
  //   .then(users => {
  //     res.json({ users });
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .json({ error: err.message });
  //   });
});

module.exports = router;