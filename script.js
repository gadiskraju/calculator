let currentInput = '';
let previousInput = '';
let operator = '';

const display = document.getElementById('display');

// Append selected number to the display string
function appendNumber(number) {
    if (number === '0' && currentInput === '0') return; // Prevent multiple leading zeros
    currentInput += number;
    updateDisplay(currentInput);
}

// Set active calculation operator
function setOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate(); // Chain calculations together if operator is pressed sequentially
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

// Safely clear all system state memories
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('0');
}

// Update the physical interface layout element
function updateDisplay(value) {
    display.value = value;
}

// Execute basic arithmetic safe calculations
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                updateDisplay("Error"); // Stop division by zero crashes
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}
