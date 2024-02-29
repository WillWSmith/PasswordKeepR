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


const copyToClipboard = function (text) {
  navigator.clipboard.writeText(text)
  .then(() => {
    alert('Password copied to clipboard');
  })
  .catch((err) => {
    console.error('Failed to copy password to clipboard:', err);
  });
};


$(document).ready(function () {
  $('#generate-password').click(function () {
    const length = $('#length').val();
    const lowercase = $('#lowercase').is(':checked');
    const uppercase = $('#uppercase').is(':checked');
    const numbers = $('#numbers').is(':checked');
    const symbols = $('#symbols').is(':checked');
    const password = generatePassword(length, lowercase, uppercase, numbers, symbols);

    $('#passwordOutput').val(password);
  
    copyToClipboard(password);
    alert('Password copied to clipboard');
  });
});

