document.addEventListener("DOMContentLoaded", function() {
  const button = document.getElementById("discountButton");

  button.addEventListener("mouseover", function() {
      const buttonWidth = button.offsetWidth;
      const buttonHeight = button.offsetHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let newLeft = Math.random() * (windowWidth - buttonWidth);
      let newTop = Math.random() * (windowHeight - buttonHeight);

    
      newLeft = Math.max(0, Math.min(newLeft, windowWidth - buttonWidth));
      newTop = Math.max(0, Math.min(newTop, windowHeight - buttonHeight));

      button.style.left = newLeft + "px";
      button.style.top = newTop + "px";
  });
});
