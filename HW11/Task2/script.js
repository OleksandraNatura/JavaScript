document.addEventListener("DOMContentLoaded", function() {
  const textBlocks = document.querySelectorAll(".text-block");
  const redButton = document.getElementById("redButton");
  const greenButton = document.getElementById("greenButton");
  const blueButton = document.getElementById("blueButton");

  redButton.addEventListener("click", function() {
      changeTextColor("red");
  });

  greenButton.addEventListener("click", function() {
      changeTextColor("green");
  });

  blueButton.addEventListener("click", function() {
      changeTextColor("blue");
  });

  function changeTextColor(color) {
      textBlocks.forEach(function(block) {
          block.style.color = color;
      });
  }
});
