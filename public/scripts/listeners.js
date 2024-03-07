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

  // Event listener for the copy button
  $(document).ready(function() {
    $('.copyButton').each(function() {
      $(this).data('original-text', $(this).text());
    });
  });

  $(document).on('click', '.copyButton, .copyToClipboardButton', function() {
    const $button = $(this);
    const originalText = $button.data('original-text'); // Retrieve original text from data attribute
    const textToCopy = $(this).data('text');

    const tempInput = $('<input>');
    $('body').append(tempInput);
    tempInput.val(textToCopy).select();

    document.execCommand('copy');

    tempInput.remove();

    if ($button.hasClass('copyButton')) {
      $button.text('Text Copied!');
    } else if ($button.hasClass('copyToClipboardButton')) {
      $button.html('<i class="fas fa-check"></i>'); // Change the icon to indicate text copied
    }

    // Add animation class to the button to provide feedback
    $button.addClass('copyAnimation');

    setTimeout(function() {
      if ($button.hasClass('copyButton')) {
        $button.text(originalText);
      } else if ($button.hasClass('copyToClipboardButton')) {
        $button.html('<i class="fas fa-copy"></i>');
      }

      // Remove animation class after a delay to reset the animation
      $button.removeClass('copyAnimation');
    }, 750);
  });
