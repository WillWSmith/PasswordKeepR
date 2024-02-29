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
  const 



$(document).ready(function () {
  $('#generate-password').click(function () {
    const length = $('#length').val();
    const lowercase = $('#lowercase').is(':checked');
    const uppercase = $('#uppercase').is(':checked');
    const numbers = $('#numbers').is(':checked');
    const symbols = $('#symbols').is(':checked');
    const password = generatePassword(length, lowercase, uppercase, numbers, symbols);

    $('#passwordOutput').val(password);
  
  });
});


  // $('#copyButton').click(function () {
  //   $('#password').select();
  //   document.execCommand('copy');
  //   alert('Password copied to clipboard');
  // });
