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

//Do we use jQuery or vanilla JS?

const generatePassword = function (length, lowercase, uppercase, numbers, symbols) {

  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()-_=+[{]}|;:,<.>/';

  let chars = '';
  
  if (lowercase) {
    chars += lowercaseChars;
  }
  if (uppercase) {
    chars += uppercaseChars;
  }
  if (numbers) {
    chars += numberChars;
  }
  if (symbols) {
    chars += symbolChars;
  }
  if (chars === '') {
    alert('Please select at least one character type');  
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
};