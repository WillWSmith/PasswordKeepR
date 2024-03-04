// Non /index category dropdown function
$(document).ready(function() {
  $.ajax({
    method: 'GET',
    url: '/fetch-categories',
    success: function(data) {
      $('#category').empty();
      data.categories.forEach(function(category) {
        $('#category').append(`<option value="${category.id}">${category.name}</option>`);
      });
    },
    error: function(err) {
      console.error('Error fetching categories:', err);
    }
  });
});


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
