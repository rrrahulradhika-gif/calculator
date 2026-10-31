const resultDisplay = document.getElementById("result");
const expressionDisplay = document.getElementById("expression");

let currentValue = "0";
let previousValue = null;
let selectedOperator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  resultDisplay.textContent = currentValue;
}

function formatNumber(number) {
  if (!Number.isFinite(number)) return "Error";
  return String(Number(number.toPrecision(12)));
}

function calculate(first, second, operator) {
  switch (operator) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "*":
      return first * second;
    case "/":
      return second === 0 ? null : first / second;
    default:
      return second;
  }
}

function enterNumber(number) {
  if (shouldResetDisplay) {
    currentValue = number;
    shouldResetDisplay = false;
  } else if (currentValue === "0") {
    currentValue = number;
  } else if (currentValue.length < 15) {
    currentValue += number;
  }
  updateDisplay();
}

function chooseOperator(operator) {
  if (selectedOperator && previousValue !== null && !shouldResetDisplay) {
    const answer = calculate(
      previousValue,
      Number(currentValue),
      selectedOperator
    );

    if (answer === null) {
      showError();
      return;
    }

    currentValue = formatNumber(answer);
    updateDisplay();
  }

  previousValue = Number(currentValue);
  selectedOperator = operator;
  expressionDisplay.textContent = currentValue + " " + operator;
  shouldResetDisplay = true;
}

function showError() {
  currentValue = "Cannot divide by zero";
  previousValue = null;
  selectedOperator = null;
  shouldResetDisplay = true;
  expressionDisplay.textContent = "Invalid operation";
  updateDisplay();
}

function performCalculation() {
  if (selectedOperator === null || previousValue === null) return;

  const first = previousValue;
  const second = Number(currentValue);
  const operator = selectedOperator;
  const answer = calculate(first, second, operator);

  expressionDisplay.textContent =
    first + " " + operator + " " + second + " =";

  if (answer === null) {
    showError();
    return;
  }

  currentValue = formatNumber(answer);
  previousValue = null;
  selectedOperator = null;
  shouldResetDisplay = true;
  updateDisplay();
}

document.querySelector(".keys").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.number !== undefined) {
    enterNumber(button.dataset.number);
    return;
  }

  if (button.dataset.operator) {
    chooseOperator(button.dataset.operator);
    return;
  }

  switch (button.dataset.action) {
    case "clear":
      currentValue = "0";
      previousValue = null;
      selectedOperator = null;
      shouldResetDisplay = false;
      expressionDisplay.textContent = "Ready";
      updateDisplay();
      break;

    case "delete":
      if (shouldResetDisplay) {
        currentValue = "0";
        shouldResetDisplay = false;
      } else {
        currentValue =
          currentValue.length > 1 ? currentValue.slice(0, -1) : "0";
        if (currentValue === "-") currentValue = "0";
      }
      updateDisplay();
      break;

    case "decimal":
      if (shouldResetDisplay) {
        currentValue = "0.";
        shouldResetDisplay = false;
      } else if (!currentValue.includes(".")) {
        currentValue += ".";
      }
      updateDisplay();
      break;

    case "sign":
      if (currentValue !== "0") {
        currentValue = currentValue.startsWith("-")
          ? currentValue.slice(1)
          : "-" + currentValue;
      }
      updateDisplay();
      break;

    case "percent":
      currentValue = formatNumber(Number(currentValue) / 100);
      updateDisplay();
      break;

    case "equals":
      performCalculation();
      break;
  }
});
