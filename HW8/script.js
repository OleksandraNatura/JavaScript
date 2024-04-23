const value = document.querySelector("#divButton");
const valueDivs = document.querySelector("#numberButton");
console.log(value);
const addDiv = () => {
  const item = document.createElement("div");
  item.innerHTML = "Buttom";
  value.appendChild(item);

  removeButton();
};

const removeButton = () => {
  let numb = document.getElementById("divButton").childNodes.length;
  valueDivs.innerHTML = "Кількість div: " + numb;
  if (numb == 11) {
    while (value.firstChild) {
      value.firstChild.remove();
    }
  }
};