document.addEventListener("DOMContentLoaded", function() {
  const messageDiv = document.getElementById("message");

  document.addEventListener("keydown", function(event) {
      // Check if Ctrl key is pressed
      if (event.ctrlKey) {
          // Check for Ctrl + S
          if (event.key === 's' || event.key === 'S') {
              event.preventDefault(); // Prevent default save action
              messageDiv.textContent = "Збережено";
          }

          // Check for Ctrl + A
          if (event.key === 'a' || event.key === 'A') {
              event.preventDefault(); // Prevent default select all action
              messageDiv.textContent = "Вибрано все";
          }

          // Check for Ctrl + Shift + S
          if (event.shiftKey && (event.key === 's' || event.key === 'S')) {
              event.preventDefault(); // Prevent default save all action
              messageDiv.textContent = "Збережено все";
          }
      }
  });
});