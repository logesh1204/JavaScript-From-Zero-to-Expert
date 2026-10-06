let btn = document.querySelector(".calculator-btn");
let experssion = document.querySelector(".experssion");
let input = document.querySelector(".input");

let inputExperssion = [];
let totalValue = 0;
let operators = ["+", "-", "*", "/", "%"];
btn.addEventListener("click", function (e) {
  clickedBtn = e.target.closest(".btn");
  if (!clickedBtn) return;
  const { key: type, value } = clickedBtn.dataset;
  //type ->  clear,delete,operator,number,dot;

  if (type === "dot") {
    !Array.from(input.textContent).includes(".") &&
      (input.textContent = `${input.textContent}.`);
    return;
  }
  if (type === "clear") {
    clear();
    return;
  }
  if (type === "delete") {
    inputDelete();
    return;
  }
  if (
    (type === typeof +input.textContent || input.textContent === "") &&
    !operators.includes(input.textContent) &&
    value !== "="
  ) {
    input.textContent = input.textContent + value;
  } else {
    if (type === "operator") {
      !operators.includes(input.textContent) && append(+input.textContent);
    } else {
      append(input.textContent);
    }
    value === "=" ? calculate() : (input.textContent = value);
  }
});
const append = function (value) {
  inputExperssion.push(value);
  displayInputExpression();
};
const calculate = function () {
  let currentoperator = "";
  if (inputExperssion.length >= 3) {
    for (const item of inputExperssion) {
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
            totalValue += item;
            currentoperator = "";
            break;
        }
      }
      console.log(inputExperssion, item, "cur oper : ", currentoperator);
      console.log("total : ", totalValue);
    }
  }
  display();
};
const displayInputExpression = function () {
  experssion.innerHTML = inputExperssion.join("");
};
const clear = function () {
  const markUp = '<span class="cursor"></span>';
  input.innerHTML = "";
  experssion.innerHTML = "";
  input.insertAdjacentHTML("afterbegin", markUp);
  inputExperssion = [];
  totalValue = 0;
};
const inputDelete = function () {
  input.textContent = Array.from(input.textContent).slice(0, -1).join("");
};
const display = function () {
  input.innerHTML = totalValue;
  inputExperssion = [];
  totalValue = 0;
};
