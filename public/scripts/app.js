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
