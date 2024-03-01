const db = require('../connection');

const getCategories = () => {
  return db.query('SELECT * FROM categories;')
    .then(data => {
      console.log('Categories:', data.rows);
      return data.rows;
    })
    .catch(err => {
      throw err;
    });
};

module.exports = { getCategories };