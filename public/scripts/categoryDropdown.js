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

  // Event listener for the category change
  $('#category').change(function() {
    const selectedCategory = $(this).val();
    fetchAccounts(selectedCategory);
  });

  // Event listener for the copy button
  $(document).ready(function() {
    $('.copyButton').each(function() {
      $(this).data('original-text', $(this).text());
    });
  });

  $(document).on('click', '.copyButton, .copyToClipboardButton', function() {
    const $button = $(this);
    const originalText = $button.data('original-text'); // Retrieve original text from data attribute
    const textToCopy = $(this).data('text');

    const tempInput = $('<input>');
    $('body').append(tempInput);
    tempInput.val(textToCopy).select();

    document.execCommand('copy');

    tempInput.remove();

    if ($button.hasClass('copyButton')) {
      $button.text('Text Copied!');
    } else if ($button.hasClass('copyToClipboardButton')) {
      $button.html('<i class="fas fa-check"></i>'); // Change the icon to indicate text copied
    }

    // Add animation class to the button to provide feedback
    $button.addClass('copyAnimation');

    setTimeout(function() {
      if ($button.hasClass('copyButton')) {
        $button.text(originalText);
      } else if ($button.hasClass('copyToClipboardButton')) {
        $button.html('<i class="fas fa-copy"></i>'); // Revert the icon back to copy
      }

      // Remove animation class after a delay to reset the animation
      $button.removeClass('copyAnimation');
    }, 750);
  });

});




