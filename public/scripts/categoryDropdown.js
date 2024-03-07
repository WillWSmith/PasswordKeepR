$(document).ready(function() {
  // Function to fetch categories and populate the select dropdown
  function populateCategoryDropdown() {
    // Add "All" option
    $('#category').append(`<option value="all">All</option>`);

    // Fetch other categories
    $.ajax({
      method: 'GET',
      url: '/fetch-categories',
      success: function(data) {
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
  function fetchAccounts(categoryId) {
    let url = '/fetch-accounts';
    let requestData = {};

    if (categoryId !== 'all') {
      requestData.categoryId = categoryId;
    }

    if (categoryId === 'all') {
      url = '/fetch-all-accounts';
    }

    $.ajax({
      method: 'GET',
      url: url,
      data: requestData,
      success: function(data) {
        // Clear previous accounts
        $('#accounts-body').empty();
        // Populate accounts table with fetched accounts
        data.accounts.forEach(function(account) {
          $('#accounts-body').append(`
            <tr>
              <td>${account.website}</td>
              <td>
                ${account.username}
                <button class="copyToClipboardButton" data-text="${account.username}">
                  <i class="fas fa-copy"></i>
                </button>
              </td>
              <td>
                ${account.password}
                <button class="copyToClipboardButton" data-text="${account.password}">
                  <i class="fas fa-copy"></i>
                </button>
              </td>
              <td>
                <a class="editButton" href="/update-account/${account.id}">Edit</a>
                <button class="deleteButton" data-id="${account.id}">Delete</button>
              </td>
            </tr>
          `);
        });

        // Event listener for the delete button
        $('.deleteButton').click(function() {
          const accountId = $(this).data('id');

          $.ajax({
            method: 'DELETE',
            url: '/delete-account/' + accountId,
            success: function() {
              // Repopulate the table after deletion
              fetchAccounts($('#category').val());
            },
            error: function(err) {
              console.error('Error deleting account:', err);
            }
          });
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

  // Event listener for the category change
  $('#category').change(function() {
    const selectedCategory = $(this).val();
    fetchAccounts(selectedCategory);
  });
});




