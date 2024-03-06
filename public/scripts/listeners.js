document.addEventListener('DOMContentLoaded', function() {
  // Select the logo and name/slogan elements
  const logo = document.getElementById('logo');
  const nameAndSlogan = document.getElementById('nameAndSlogan');

  // Add click event listeners to the logo and name/slogan
  logo.addEventListener('click', () => {
    window.location.href = '/'; // Redirect to the homepage
  });

  nameAndSlogan.addEventListener('click', () => {
    window.location.href = '/'; // Redirect to the homepage
  });
});



// Function to change the background color of the password input based on the number of checkboxes checked
function updatePasswordInputBackground() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  var passwordInput = document.getElementById('password');

  if (checkboxes.length === 2) {
    passwordInput.className = 'yellow';
  } else if (checkboxes.length >= 3) {
    passwordInput.className = 'green';
  } else {
    passwordInput.className = ''; // Reset to default (red) if less than 2 checkboxes are checked
  }
}

// Event listeners for checkbox change event
document.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
  checkbox.addEventListener('change', updatePasswordInputBackground);
});