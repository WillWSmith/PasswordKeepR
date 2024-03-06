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

