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

// Event listener for background selector

document.addEventListener('DOMContentLoaded', function () {
  const backgroundSelect = document.getElementById('background-select');

  backgroundSelect.addEventListener('change', function () {
      const selectedBackground = backgroundSelect.value;
      document.body.className = ""; // Clear existing classes

      // Add class based on selected background
      if (selectedBackground === "background2.png") {
          document.body.classList.add("background2");
      } else if (selectedBackground === "background3.png") {
          document.body.classList.add("background3");
      } else if (selectedBackground === "background4.png") {
          document.body.classList.add("background4");
      } else {
          // Default background1.jpg
          document.body.classList.add("background");
      }
  });
});
