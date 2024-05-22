document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  // Create and add the "Draw Circle" button
  const drawCircleButton = document.createElement('button');
  drawCircleButton.textContent = 'Намалювати коло';
  body.appendChild(drawCircleButton);

  drawCircleButton.addEventListener('click', () => {
      // Remove the "Draw Circle" button
      drawCircleButton.remove();

      // Create input field for diameter
      const diameterInput = document.createElement('input');
      diameterInput.type = 'number';
      diameterInput.placeholder = 'Діаметр кола';

      // Create the "Draw" button
      const drawButton = document.createElement('button');
      drawButton.textContent = 'Намалювати';

      // Add input field and "Draw" button to the body
      body.appendChild(diameterInput);
      body.appendChild(drawButton);

      drawButton.addEventListener('click', () => {
          const diameter = diameterInput.value;

          // Remove input field and "Draw" button
          diameterInput.remove();
          drawButton.remove();

          // Create container for circles
          const circleContainer = document.createElement('div');
          circleContainer.id = 'circleContainer';
          body.appendChild(circleContainer);

          // Function to generate a random color
          function getRandomColor() {
              const letters = '0123456789ABCDEF';
              let color = '#';
              for (let i = 0; i < 6; i++) {
                  color += letters[Math.floor(Math.random() * 16)];
              }
              return color;
          }

          // Create 100 circles
          for (let i = 0; i < 100; i++) {
              const circle = document.createElement('div');
              circle.classList.add('circle');
              circle.style.width = `${diameter}px`;
              circle.style.height = `${diameter}px`;
              circle.style.backgroundColor = getRandomColor();
              circleContainer.appendChild(circle);
          }

          // Event listener for removing circles and shifting the rest
          circleContainer.addEventListener('click', (event) => {
              if (event.target.classList.contains('circle')) {
                  event.target.remove();

                  // Reorganize the circles
                  const remainingCircles = Array.from(circleContainer.children);
                  circleContainer.innerHTML = '';
                  remainingCircles.forEach(circle => circleContainer.appendChild(circle));
              }
          });
      });
  });
});