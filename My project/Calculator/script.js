let btns = document.querySelectorAll(".btn");
let experssion = document.querySelector(".experssion");
let input = document.querySelector(".input");

let experssionInput = [];
let totalValue = 0;
btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    console.log(this.dataset);
    const { key: type, value } = this.dataset;
    // clear,delete,operator,number,dot;

    switch (type) {
      case "number":
        input.textContent = input.textContent + value;
        console.log(input.textContent.length);
        break;
      case "operator":
        let number = Number(input.textContent);
        experssionInput.push(number);
        experssionInput.push(value);
        calculate();
        break;
      case "dot":
        input.textContent = input.textContent + 1;
        break;
      case "clear":
        input.textContent = input.textContent + 1;
        break;
      case "delete":
        experssionInput.pop();
        display();
        break;
    }
  });
});

const calculate = function () {
  let operators = ["+", "-", "*", "/", "%"];
  let currentoperator = "+";
  if (experssionInput.length > 3) {
    for (const item of experssionInput) {
      if (operators.includes(item)) {
        currentoperator = item;
      } else {
        switch (currentoperator) {
          case "+":
            totalValue += item;
            currentoperator = "";
            break;
          case "-":
            totalValue -= item;
            currentoperator = "";
            break;
          case "*":
            totalValue *= item;
            currentoperator = "";
            break;
          case "/":
            totalValue /= item;
            currentoperator = "";
            break;
          case "%":
            totalValue %= item;
            currentoperator = "";
            break;
          default:
            currentoperator = "";
            break;
        }
      }
    }
  }
  display();
};
const display = function () {
  experssion.innerHTML = experssionInput.join("");
  input.textContent = "";
};
