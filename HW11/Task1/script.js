window.addEventListener("DOMContentLoaded", function() {
    // Отримуємо елементи DOM
    const editor = document.getElementById("editor");
    const saveButton = document.getElementById("saveButton");
    const modal = document.getElementById("myModal");
    const okButton = document.getElementById("okButton");
    const cancelButton = document.getElementById("cancelButton");

    // Встановлюємо прапорці, що дані збережені та чи є введений текст
    let isSaved = false;
    let hasInput = false;
    let modalOpen = false;

    // Обробник події для кнопки "Зберегти"
    saveButton.addEventListener("click", function() {
        isSaved = true;
        alert("Дані збережено! (але фактичного збереження не відбувається)");
    });

    // Обробник події для введення тексту в редактор
    editor.addEventListener("input", function() {
        hasInput = true;
    });

    // Перевірка при спробі закрити сторінку
    window.addEventListener("beforeunload", function(event) {
        if (!isSaved && hasInput && editor.value.trim() !== "" && !modalOpen) {
            // Відображення модального вікна
            modal.style.display = "block";
            modalOpen = true;
            // Блокуємо відправку даних
            event.preventDefault();
            // Повертаємо сповіщення
            event.returnValue = "У вас є незбережені зміни. Ви дійсно хочете покинути сторінку?";
        }
    });

    // Обробник події для кнопки "OK" у модальному вікні
    okButton.addEventListener("click", function() {
        modal.style.display = "none"; // Ховаємо модальне вікно
        isSaved = true; // Позначаємо, що дані збережено
        window.location.href = "about:blank"; // Перенаправляємо на пусту сторінку
    });

    // Обробник події для кнопки "Скасувати" у модальному вікні
    cancelButton.addEventListener("click", function() {
        modal.style.display = "none"; // Ховаємо модальне вікно
        modalOpen = false;
    });
});
