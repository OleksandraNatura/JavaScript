/**
 * Клас, об'єкти якого описують параметри гамбургера.
 *
 * @constructor
 * @param size Розмір
 * @param stuffing Начинка
 * @throws {HamburgerException} При неправильному використанні
 */
function Hamburger(size, stuffing) {
  if (!size) {
      throw new HamburgerException('no size given');
  }
  if (!Hamburger.SIZES[size]) {
      throw new HamburgerException('invalid size ' + size);
  }
  if (!stuffing) {
      throw new HamburgerException('no stuffing given');
  }
  if (!Hamburger.STUFFINGS[stuffing]) {
      throw new HamburgerException('invalid stuffing ' + stuffing);
  }

  this.size = size;
  this.stuffing = stuffing;
  this.toppings = [];
}

/* Розміри, види начинок та добавок */
Hamburger.SIZE_SMALL = 'SIZE_SMALL';
Hamburger.SIZE_LARGE = 'SIZE_LARGE';
Hamburger.STUFFING_CHEESE = 'STUFFING_CHEESE';
Hamburger.STUFFING_SALAD = 'STUFFING_SALAD';
Hamburger.STUFFING_POTATO = 'STUFFING_POTATO';
Hamburger.TOPPING_MAYO = 'TOPPING_MAYO';
Hamburger.TOPPING_SPICE = 'TOPPING_SPICE';

Hamburger.SIZES = {
  SIZE_SMALL: { price: 50, calories: 20 },
  SIZE_LARGE: { price: 100, calories: 40 }
};

Hamburger.STUFFINGS = {
  STUFFING_CHEESE: { price: 10, calories: 20 },
  STUFFING_SALAD: { price: 20, calories: 5 },
  STUFFING_POTATO: { price: 15, calories: 10 }
};

Hamburger.TOPPINGS = {
  TOPPING_MAYO: { price: 20, calories: 5 },
  TOPPING_SPICE: { price: 15, calories: 0 }
};

/**
* Додати добавку до гамбургера. Можна додати кілька
* Добавок, за умови, що вони різні.
*
* @param topping Тип добавки
* @throws {HamburgerException} При неправильному використанні
*/
Hamburger.prototype.addTopping = function (topping) {
  if (!Hamburger.TOPPINGS[topping]) {
      throw new HamburgerException('invalid topping ' + topping);
  }
  if (this.toppings.indexOf(topping) !== -1) {
      throw new HamburgerException('duplicate topping ' + topping);
  }
  this.toppings.push(topping);
};

/**
* Прибрати добавку, за умови, що вона раніше була
* Додано.
*
* @param topping Тип добавки
* @throws {HamburgerException} При неправильному використанні
*/
Hamburger.prototype.removeTopping = function (topping) {
  const index = this.toppings.indexOf(topping);
  if (index === -1) {
      throw new HamburgerException('topping not found ' + topping);
  }
  this.toppings.splice(index, 1);
};

/**
* Отримати список добавок.
*
* @return {Array} Масив доданих добавок містить константи
* Hamburger.TOPPING_*
*/
Hamburger.prototype.getToppings = function () {
  return this.toppings;
};

/**
* Дізнатися розмір гамбургера
*/
Hamburger.prototype.getSize = function () {
  return this.size;
};

/**
* Дізнатися начинку гамбургера
*/
Hamburger.prototype.getStuffing = function () {
  return this.stuffing;
};

/**
* Дізнатись ціну гамбургера
* @return {Number} Ціна у тугриках
*/
Hamburger.prototype.calculatePrice = function () {
  let price = Hamburger.SIZES[this.size].price + Hamburger.STUFFINGS[this.stuffing].price;
  for (let i = 0; i < this.toppings.length; i++) {
      price += Hamburger.TOPPINGS[this.toppings[i]].price;
  }
  return price;
};

/**
* Дізнатися калорійність
* @return {Number} Калорійність калорій
*/
Hamburger.prototype.calculateCalories = function () {
  let calories = Hamburger.SIZES[this.size].calories + Hamburger.STUFFINGS[this.stuffing].calories;
  for (let i = 0; i < this.toppings.length; i++) {
      calories += Hamburger.TOPPINGS[this.toppings[i]].calories;
  }
  return calories;
};

/**
* Надає інформацію про помилку під час роботи з гамбургером.
* Подробиці зберігаються як message.
* @constructor
*/
function HamburgerException(message) {
  this.message = message;
  this.name = 'HamburgerException';
}

// Логіка взаємодії з HTML
document.getElementById('calculate').addEventListener('click', function () {
  try {
      const size = document.getElementById('size').value;
      const stuffing = document.getElementById('stuffing').value;

      const hamburger = new Hamburger(size, stuffing);

      const toppings = document.querySelectorAll('input[type="checkbox"]:checked');
      toppings.forEach(function (topping) {
          hamburger.addTopping(topping.value);
      });

      const price = hamburger.calculatePrice();
      const calories = hamburger.calculateCalories();

      document.getElementById('result').textContent = `Ціна: ${price} грн, Калорії: ${calories}`;
  } catch (e) {
      if (e instanceof HamburgerException) {
          document.getElementById('result').textContent = `Помилка: ${e.message}`;
      } else {
          throw e;
      }
  }
});
