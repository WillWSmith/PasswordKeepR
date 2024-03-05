$(document).ready(function() {
  $('#generate-password').click(function(e) {
    e.preventDefault(); // Prevent form submission

    // Read form inputs
    let length = parseInt($('#length').val());
    const includeLowercase = $('#lowercase').is(':checked');
    const includeUppercase = $('#uppercase').is(':checked');
    const includeNumbers = $('#numbers').is(':checked');
    const includeSymbols = $('#symbols').is(':checked');

    // Validate password length
    if (isNaN(length) || length < 8 || length > 32) {
      alert('Password length must be between 8 and 32 characters.');
      return;
    }

    // Validate criteria selection (at least 2 selected)
    const criteriaCount = [includeLowercase, includeUppercase, includeNumbers, includeSymbols].filter(Boolean).length;
    if (criteriaCount < 2) {
      alert('Please select at least 2 criteria.');
      return;
    }

    // Generate password based on criteria
    let password = generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols);

    // Display generated password
    $('#passwordOutput').text(password);
    $('#generatedPassword').text(password); // Update the generatedPassword span
  });

  // Event listener for toggling the password form display
  $('#generatePasswordHeader').click(function() {
    var form = $('#passwordForm');
    if (form.css('display') === 'none' || form.css('display') === '') {
      form.css('display', 'block');
    } else {
      form.css('display', 'none');
    }
  });

  // Event listener for changing cursor on hover
  $('#generatePasswordHeader').hover(
    function() {
      $(this).css('cursor', 'pointer');
    },
    function() {
      $(this).css('cursor', 'auto');
    }
  );

  // Event listener for copying text when the "Copy Password" button is clicked
$(document).on('click', '#copy-password', function() {
  const password = $('#passwordOutput').text(); // Get the generated password
  const $button = $(this);
  const originalText = $button.text();

  // Create a temporary input element to copy the password
  const tempInput = $('<input>');
  $('body').append(tempInput);
  tempInput.val(password).select();

  // Copy the password to the clipboard
  document.execCommand('copy');

  // Remove the temporary input element
  tempInput.remove();

  // Update the button text to indicate that the password has been copied
  $button.text('Text Copied!');
  setTimeout(function() {
    $button.text(originalText);
  }, 750); // Reset the button text after 1.5 seconds
});

});

function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {

  // Define character sets based on selected criteria
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_-+=[]{}|;:,.?';

  // Initialize character array with selected character types
  let chars = [];
  if (includeLowercase) chars.push(lowercaseChars);
  if (includeUppercase) chars.push(uppercaseChars);
  if (includeNumbers) chars.push(numberChars);
  if (includeSymbols) chars.push(symbolChars);

  // Generate password based on criteria
  let password = '';
  let addedChars = [];

  // Add at least one character of each selected type
  chars.forEach(charSet => {
    const randomChar = charSet.charAt(Math.floor(Math.random() * charSet.length));
    password += randomChar;
    addedChars.push(randomChar);
  });

  // Add remaining characters randomly
  const combinedChars = chars.join('');
  for (let i = password.length; i < length; i++) {
    const randomChar = combinedChars.charAt(Math.floor(Math.random() * combinedChars.length));
    password += randomChar;
    addedChars.push(randomChar);
  }

  // Ensure that at least one character of each type is added
  if (!includeLowercase || !addedChars.some(char => lowercaseChars.includes(char))) {
    password = password.replace(/[a-z]/, lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length)));
  }
  if (!includeUppercase || !addedChars.some(char => uppercaseChars.includes(char))) {
    password = password.replace(/[A-Z]/, uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length)));
  }
  if (!includeNumbers || !addedChars.some(char => numberChars.includes(char))) {
    password = password.replace(/\d/, numberChars.charAt(Math.floor(Math.random() * numberChars.length)));
  }
  if (!includeSymbols || !addedChars.some(char => symbolChars.includes(char))) {
    password = password.replace(/[!@#$%^&*()_\-+=\[\]{}|;:,.<>?]/, symbolChars.charAt(Math.floor(Math.random() * symbolChars.length)));
  }

  return password;
}


