// Client facing scripts here

// Category Selection Function & Population

$(document).ready(function() {
  // Function to fetch accounts based on selected category
  function fetchAccountsByCategory(categoryId) {
    $.ajax({
      method: 'GET',
      url: '/fetch-accounts',
      data: { categoryId: categoryId },
      success: function(data) {
        // Clear previous accounts
        $('#accountTableBody').empty();
        // Populate table with fetched accounts
        data.accounts.forEach(function(account) {
          $('#accountTableBody').append(`
            <tr>
              <td>${account.website}</td>
              <td>${account.username}</td>
              <td>${account.password}</td>
              <td>
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

  // Event listener for category select change
  $('#category').change(function() {
    const categoryId = $(this).val();
    fetchAccountsByCategory(categoryId);
  });
});

