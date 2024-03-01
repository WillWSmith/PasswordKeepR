$(document).ready(function() {
  // Function to fetch categories and populate the select dropdown
  function populateCategoryDropdown() {
    $.ajax({
      method: 'GET',
      url: '/fetch-categories',
      success: function(data) {
        // Clear previous options
        $('#category').empty();
        // Populate select dropdown with fetched categories
        data.categories.forEach(function(category) {
          $('#category').append(`<option value="${category.id}">${category.name}</option>`);
        });
      },
      error: function(err) {
        console.error('Error fetching categories:', err);
      }
    });
  }

  // Function to fetch accounts based on category
  function fetchAccounts(categoryName) {
    $.ajax({
      method: 'GET',
      url: '/fetch-accounts',
      data: { categoryName: categoryName },
      success: function(data) {
        // Clear previous accounts
        $('#accounts-table tbody').empty();
        // Populate accounts table with fetched accounts
        data.accounts.forEach(function(account) {
          $('#accounts-table tbody').append(`
            <tr>
              <td>${account.website}</td>
              <td>${account.username}</td>
              <td>${account.password}</td>
              <td>
                <button id="copy-username" data-username="${account.username}">Copy Username</button>
                <button id="copy-password" data-password="${account.password}">Copy Password</button>
                <a href="/update-account/${account.id}">Edit</a>
              </td>
            </tr>
          `);
        });
      },
      error: function(err) {
        console.error('Error fetching accounts:', err);
      }
    });
  }

  // Call the function to populate the category dropdown when the page loads
  populateCategoryDropdown();

  // Call the function to fetch accounts when the page loads
  fetchAccounts('all');

  // Event listener for category dropdown change
  $('#category').change(function() {
    const selectedCategory = $(this).val();
    fetchAccounts(selectedCategory);
  });
});


