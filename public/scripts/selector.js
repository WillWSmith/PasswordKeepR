document.addEventListener('DOMContentLoaded', function () {
  const backgroundSelect = document.getElementById('background-select');

  backgroundSelect.addEventListener('change', function () {
      const selectedBackground = backgroundSelect.value;
      document.body.className = ""; // Clear existing classes

      // Add class based on selected background
      if (selectedBackground === "background2.jpg") {
          document.body.classList.add("background2");
      } else if (selectedBackground === "background3.jpg") {
          document.body.classList.add("background3");
      } else if (selectedBackground === "background4.jpg") {
          document.body.classList.add("background4");
      } else {
          // Default background1.jpg
          document.body.classList.add("background1");
      }
  });
});
