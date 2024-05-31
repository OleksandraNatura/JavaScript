const pizzaBase = document.getElementById('pizzaBase');
const ingredients = document.querySelectorAll('.draggable');
const discountBtn = document.getElementById('discountBtn');
const selectSizeBtns = document.querySelectorAll('.selectSizeBtn');
let sauces = [];
let toppings = [];
let currentPrice = 50; // Initial price for small pizza

function handleDragStart(e) {
    e.dataTransfer.setData('text', e.target.id);
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const ingredientId = e.dataTransfer.getData('text');
    const ingredient = document.getElementById(ingredientId);
    const img = document.createElement('img');
    img.src = ingredient.querySelector('img').src;
    img.style.width = '100%';
    img.style.height = '100%';
    pizzaBase.appendChild(img);

    if (ingredientId.startsWith('sauce')) {
        sauces.push(ingredient.querySelector('span').textContent);
    } else {
        toppings.push(ingredient.querySelector('span').textContent);
    }

    updateOrderDetails();
    updatePrice();
}

function updatePrice() {
    const size = document.querySelector('input[name="size"]:checked').value;
    switch (size) {
        case 'small':
            currentPrice = 50;
            break;
        case 'mid':
            currentPrice = 75;
            break;
        case 'big':
            currentPrice = 100;
            break;
    }
    currentPrice += sauces.length * 10;
    currentPrice += toppings.length * 15;

    document.querySelector('.price p').textContent = `Ціна: ${currentPrice} грн`;
}

function updateOrderDetails() {
    document.querySelector('.sauces p').textContent = `Соуси: ${sauces.join(', ')}`;
    document.querySelector('.topings p').textContent = `Топінги: ${toppings.join(', ')}`;
}

function handleDiscountBtn() {
    const x = Math.random() * (window.innerWidth - discountBtn.clientWidth);
    const y = Math.random() * (window.innerHeight - discountBtn.clientHeight);
    discountBtn.style.transform = `translate(${x}px, ${y}px)`;
}

function sendOrder() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (!name || !phone || !email) {
        alert("Будь ласка, заповніть всі поля!");
        return;
    }

    const size = document.querySelector('input[name="size"]:checked').value;
    const orderDetails = `
        Ім'я: ${name}\n
        Телефон: ${phone}\n
        Електронна пошта: ${email}\n
        Розмір піци: ${size}\n
        Соуси: ${sauces.join(', ')}\n
        Топінги: ${toppings.join(', ')}\n
        Ціна: ${currentPrice} грн
    `;

    window.location.href = `mailto:ovnatura@gmail.com?subject=Замовлення піци&body=${encodeURIComponent(orderDetails)}`;
}

function selectSize(size) {
    document.querySelector(`input[value="${size}"]`).checked = true;
    updatePrice();
    updateOrderDetails();
}

ingredients.forEach(ingredient => {
    ingredient.addEventListener('dragstart', handleDragStart);
});

pizzaBase.addEventListener('dragover', handleDragOver);
pizzaBase.addEventListener('drop', handleDrop);
discountBtn.addEventListener('mouseover', handleDiscountBtn);

selectSizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        selectSize(btn.dataset.size);
    });
});
