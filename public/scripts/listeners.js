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

  const selectedBackground = localStorage.getItem('selectedBackground');
  if (selectedBackground) {
      backgroundSelect.value = selectedBackground;
      applyBackground(selectedBackground);
  }

  backgroundSelect.addEventListener('change', function () {
      const selectedBackground = backgroundSelect.value;
      localStorage.setItem('selectedBackground', selectedBackground);
      applyBackground(selectedBackground);
  });

  function applyBackground(selectedBackground) {
      document.body.className = "";

      if (selectedBackground === "background2.png") {
          document.body.classList.add("background2");
      } else if (selectedBackground === "background3.png") {
          document.body.classList.add("background3");
      } else if (selectedBackground === "background4.png") {
          document.body.classList.add("background4");
      } else {
          document.body.classList.add("background");
      }
  }
});

