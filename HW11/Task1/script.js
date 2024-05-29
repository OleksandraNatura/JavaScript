document.addEventListener("DOMContentLoaded", function() {
  const editor = document.getElementById("editor");
  const saveButton = document.getElementById("saveButton");
  let isSaved = false;

  saveButton.addEventListener("click", function() {
      isSaved = true;
      alert("Дані збережено! (але фактичного збереження не відбувається)");
  });

  window.addEventListener("beforeunload", function(event) {
      if (!isSaved && editor.value.trim() !== "") {
          const confirmationMessage = "У вас є незбережені зміни. Ви дійсно хочете покинути сторінку?";
          event.returnValue = confirmationMessage;
          return confirmationMessage;
      }
  });
});
