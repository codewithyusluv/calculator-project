const display = document.getElementById('display');

let currentInput = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
  display.value = currentInput;
}

function clearCalculator() {
  currentInput = '0';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay();
}

function calculate(firstValue, secondValue, selectedOperator) {
  switch (selectedOperator) {
    case '+':
      return firstValue + secondValue;
    case '-':
      return firstValue - secondValue;
    case '*':
      return firstValue * secondValue;
    case '/':
      return secondValue === 0 ? 'Error' : firstValue / secondValue;
    default:
      return secondValue;
  }
}

function inputNumber(value) {
  if (waitingForSecondOperand) {
    currentInput = value;
    waitingForSecondOperand = false;
  } else {
    currentInput = currentInput === '0' ? value : currentInput + value;
  }

  updateDisplay();
}

function chooseOperator(nextOperator) {
  const inputValue = Number(currentInput);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    currentInput = String(result);
    firstOperand = result;
  }

  operator = nextOperator;
  waitingForSecondOperand = true;
  updateDisplay();
}

function evaluateExpression() {
  if (operator === null || firstOperand === null) {
    return;
  }

  const result = calculate(firstOperand, Number(currentInput), operator);

  currentInput = String(result);
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay();
}

document.querySelectorAll('.number').forEach((button) => {
  button.addEventListener('click', () => {
    inputNumber(button.dataset.value);
  });
});

document.querySelectorAll('.operator').forEach((button) => {
  button.addEventListener('click', () => {
    chooseOperator(button.dataset.value);
  });
});

document.querySelector('.clear').addEventListener('click', clearCalculator);
document.querySelector('.equals').addEventListener('click', evaluateExpression);

updateDisplay();
