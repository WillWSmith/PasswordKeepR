/*
 * All routes for Accounts are defined here
 * Since this file is loaded in server.js into /accounts,
 *   these routes are mounted onto /accounts
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Route to fetch all accounts
router.get('/fetch-all-accounts', (req, res) => {
  const userOrganizationId = 1; // Assuming the organization ID is hardcoded

  let query = `
    SELECT accounts.*
    FROM accounts
    JOIN categories ON accounts.category_id = categories.id
    JOIN organizations ON categories.organization_id = organizations.id
    WHERE organizations.id = $1
  `;
  const values = [userOrganizationId];

  db.query(query, values)
    .then(data => {
      const accounts = data.rows;
      res.json({ accounts });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});


// Route to fetch accounts based on category
router.get('/fetch-accounts', (req, res) => {
  const userOrganizationId = 1; // Assuming the organization ID is hardcoded
  const categoryName = req.query.categoryName;
  const categoryId = req.query.categoryId;

  let query = `
    SELECT accounts.*
    FROM accounts
    JOIN categories ON accounts.category_id = categories.id
    JOIN organizations ON categories.organization_id = organizations.id
    WHERE organizations.id = $1
  `;
  const values = [userOrganizationId];

  // If a specific category is selected, filter accounts by category name
  if (categoryName !== 'all') {
    query += ` AND categories.id = $2`;
    values.push(categoryId);
  }

  db.query(query, values)
    .then(data => {
      const accounts = data.rows;
      res.json({ accounts });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});


// Get the new-account page
router.get('/new-account', (req, res) => {
  const user_email = req.cookies.user_email; // get user_email from cookie
  const query = `
    SELECT organizations.name as organization_name, users.name as user_name
    FROM organizations
    JOIN users ON users.id = organizations.user_id
    WHERE organizations.user_id = (SELECT id FROM users WHERE email = $1)`;
  const values = [user_email];

  db.query(query, values)
    .then(data => {
      console.log(data.rows);

      const organization_name = data.rows[0].organization_name;
      const user_name = data.rows[0].user_name;
      const templateVars = { user_email, organization_name, user_name};

      // render the new-account page
      res.render('new-account', templateVars);
    })
    .catch (err => {
      res.status(500).json({ error: err.message });
  });
});


// Create a new account
router.post('/new-account', (req, res) => {
  const website = req.body.website;
  const category = req.body.category_id;
  const username = req.body.username;
  const password = req.body.password;

  if (!website || !username || !password) {
    return res.status(400).send('All fields are required');
  }
  if (website.length > 50 || username.length > 50 || password.length > 50) {
    return res.status(400).send('All fields must be less than 50 characters');
  }

  const query = `INSERT INTO accounts (website, category_id, username, password) VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [website, category, username, password];
  console.log('values:', values);
  db.query(query, values)
    .then(data => {
      const account = data.rows[0];
      res.json({ account });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  res.redirect('/index'); // send the user to the index page
});


// Get the edit-account page
router.get('/update-account/:id', (req, res) => {
  const accountId = req.params.id;
  const user_email = req.cookies.user_email;

  const accountQuery = `SELECT * FROM accounts WHERE id = $1`;
  const accountValues = [accountId];

  db.query(accountQuery, accountValues)
    .then(accountData => {
      const account = accountData.rows[0];

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
          const templateVars = { user_email, organization_name, user_name, id: accountId, website: account.website, username: account.username, password: account.password};

          res.render('update-account', templateVars);
    })
    .catch (err => {
      res.status(500).json({ error: err.message });
    });
  })
  .catch(err => {
    res.status(500).json({ error: err.message });
  });
});

router.post('/update-account/:id', (req, res) => {
  const accountId = req.params.id;
  const newPassword = req.body.password;
  const query = `UPDATE accounts SET password = $1 WHERE id = $2 RETURNING *`;
  const values = [newPassword, accountId];

  db.query(query, values)
    .then(data => {
      const account = data.rows[0];
      res.json({ account });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });

  res.redirect('/index'); // send the user to the index page
});

// Update an account
router.put('/accounts/:id', (req, res) => {
  const accountId = req.params.id;
  const newPassword = req.body.password;
  const query = `UPDATE accounts SET password = $1 WHERE id = $2 RETURNING *`;
  const values = [newPassword, accountId];

  db.query(query, values)
    .then(data => {
      const account = data.rows[0];
      res.json({ account });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });

  res.redirect('/index'); // send the user to the index page
});





module.exports = router;
