$(document).ready(function() {
  // Function to fetch categories and populate the select dropdown
  function populateCategoryDropdown() {
    $.ajax({
      method: 'GET',
      url: '/fetch-categories',
      success: function(data) {
        // Clear previous options
        $('#category').empty();
        // Add "All" option
        $('#category').append(`<option value="all">All</option>`);
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
// Function to fetch accounts based on category
function fetchAccounts(categoryId) {
  let url = '/fetch-accounts';
  let requestData = {};

  if (categoryId !== 'all') {
    requestData.categoryId = categoryId; // Sending categoryId instead of categoryName
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
            <td>
            ${account.website}
            </td>
            <td>
            ${account.username}
            <button class="copyButton" data-text="${account.username}">
            <i class="fas fa-copy"></i>
            </button>
            </td>
            <td>
            ${account.password}
            <button class="copyButton" data-text="${account.password}">
            <i class="fas fa-copy"></i>
            </td>
            <td>
              <a class="editButton" href="/update-account/${account.id}">Edit</a>
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

  // Event listeners
  $('#category').change(function() {
    const selectedCategory = $(this).val();
    fetchAccounts(selectedCategory);
  });
});

  // Event listener for the copy button
  $(document).on('click', '.copyButton', function() {
    const $button = $(this);
    const originalText = $button.text();
    const textToCopy = $(this).data('text');

    const tempInput = $('<input>');
    $('body').append(tempInput);
    tempInput.val(textToCopy).select();

    document.execCommand('copy');

    tempInput.remove();

    $(this).text('Text Copied!');
    setTimeout(function() {
      $button.text(originalText);
    }, 750);
  });


