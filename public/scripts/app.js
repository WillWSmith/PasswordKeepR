// Client facing scripts here

//Do we use jQuery or vanilla JS?

const generatePassword = function (length, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {

  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()-_=+[{]}|;:,<.>/';

  let chars = '';
  
  if (includeLowercase) {
    chars += lowercaseChars;
  }
  if (includeUppercase) {
    chars += uppercaseChars;
  }
  if (includeNumbers) {
    chars += numberChars;
  }
  if (includeSymbols) {
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