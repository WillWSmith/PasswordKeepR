// Logo / Name / Slogan Redirect Listener
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

// Background Selector Listener

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
