// Client facing scripts here

//Do we use jQuery or vanilla JS?

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