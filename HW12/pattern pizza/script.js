
document.addEventListener('DOMContentLoaded', () => {
    const pizzaForm = document.getElementById('pizzaForm');
    const pizzaBase = document.getElementById('pizzaBase');
    const resultPrice = document.querySelector('.price p');
    const resultSauces = document.querySelector('.sauces p');
    const resultTopings = document.querySelector('.topings p');

    let price = 50;
    const selectedIngredients = {
        size: 'small',
        sauces: [],
        topings: []
    };

    const ingredientPrices = {
        sauces: {
            sauceClassic: 5,
            sauceBBQ: 7,
            sauceRikotta: 10
        },
        topings: {
            moc1: 8,
            moc2: 9,
            moc3: 10,
            telya: 12,
            vetch1: 5,
            vetch2: 6
        }
    };

    function updatePrice() {
        let newPrice = 50;
        selectedIngredients.sauces.forEach(sauce => {
            newPrice += ingredientPrices.sauces[sauce];
        });
        selectedIngredients.topings.forEach(toping => {
            newPrice += ingredientPrices.topings[toping];
        });
        price = newPrice;
        resultPrice.textContent = `Ціна: ${price} грн`;
    }

    function updateResult() {
        resultSauces.textContent = `Соуси: ${selectedIngredients.sauces.join(', ')}`;
        resultTopings.textContent = `Топінги: ${selectedIngredients.topings.join(', ')}`;
    }

    pizzaForm.addEventListener('change', (e) => {
        if (e.target.name === 'size') {
            const selectedSize = e.target.value;
            selectedIngredients.size = selectedSize;
            console.log(`Selected size: ${selectedSize}`);
        }
        updatePrice();
        updateResult();
    });

    function handleDrop(e) {
        e.preventDefault();
        const ingredientId = e.dataTransfer.getData('text/plain');
        const ingredientType = ingredientId.includes('sauce') ? 'sauces' : 'topings';

        if (!selectedIngredients[ingredientType].includes(ingredientId)) {
            selectedIngredients[ingredientType].push(ingredientId);
            updatePrice();
            updateResult();
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    pizzaBase.addEventListener('drop', handleDrop);
    pizzaBase.addEventListener('dragover', handleDragOver);

    const draggableElements = document.querySelectorAll('.draggable');
    draggableElements.forEach(element => {
        element.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });
    });
});

function sendOrder() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (name && phone && email) {
        alert(`Замовлення відправлено! Ім'я: ${name}, Телефон: ${phone}, Email: ${email}`);
    } else {
        alert('Будь ласка, заповніть усі поля.');
    }
}
