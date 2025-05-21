'use strict'

/////////////////////////// Declaration of Variables //////////////////////////////////////
const calculatorDisplay = document.querySelector('h1');
const inputButtons = document.querySelectorAll('button');
const clearButton = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;


////////////////////////////////// Objects //////////////////////////////////////////////
// Calculate first and second value depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,
};


//////////////////////////////// Functions ///////////////////////////////////////////////
// Input number function
function sendNumberValue(number) {
    // Replace cuurnet display value if first value is entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false
    }
    else {
        // If the current display value is 0, replace it, if not add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

// Use Operator function
function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    // Assign first value if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        firstValue = calculation;
        calculatorDisplay.textContent = calculation;
    }
    // Ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
}

// Add Decimal Function
function addDecimal() {
    // if operator pressed, don't add decimal
    if (awaitingNextValue) return;
    // if no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// Reset Display
function resetAll() {
    calculatorDisplay.textContent = '0'
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
}


////////////////////////////// Event Listeners ///////////////////////////////////////
inputButtons.forEach((inputButton) => {
    if (inputButton.classList.length === 0) {
        inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
    }
    else if (inputButton.classList.contains('operator')) {
        inputButton.addEventListener('click', () => useOperator(inputButton.value));
    }
    else if (inputButton.classList.contains('decimal')) {
        inputButton.addEventListener('click', () => addDecimal());
    }
})

clearButton.addEventListener('click', () => resetAll())