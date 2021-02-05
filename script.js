class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.reset();
    }

    reset() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.hasDot = false;
        this.operator = undefined;

        this.updateDisplay();
    }

    updateDisplay() {
        this.previousOperandTextElement.innerText = this.previousOperand;
        if (this.operator != undefined)
            this.previousOperandTextElement.innerText += ' ' + this.operator;

        this.currentOperandTextElement.innerText = this.currentOperand;
    }

    appendCurrentOperand(character) {
        if (character == '.') {
            if (!this.hasDot) {
                this.currentOperand += character;
                this.hasDot = true;
            }
        }
        else 
            this.currentOperand += character;

        this.updateDisplay();
    }

    changeOperator(operator) {
        if (this.currentOperand == '')
            return;

        if (this.previousOperand != '' && this.operator != undefined)
            this.calculate();
        else 
            this.previousOperand = this.standarize(this.currentOperand);
        this.currentOperand = '';

        this.operator = operator;
        this.hasDot = false;
        this.updateDisplay();
    }

    popBackCurrentOperand() {
        if (this.currentOperand[this.currentOperand.length - 1] == '.')
            this.hasDot = false;
        this.currentOperand = this.currentOperand.slice(0, -1);
        this.updateDisplay();
    }

    calculate() {
        if (this.operator == undefined) {
            this.previousOperand = this.standarize(this.currentOperand);
            this.currentOperand = '';
            this.hasDot = false;
            this.updateDisplay();
            return;
        }

        if (this.currentOperand == '' || this.previousOperand == '')
            return;
        
        let a = Number(this.standarize(this.previousOperand));
        let b = Number(this.standarize(this.currentOperand));
        
        if (this.operator == '+')
            a += b
        else if (this.operator == '-')
            a -= b;
        else if (this.operator == '*')
            a *= b;
        else 
            a /= b;

        this.previousOperand = String(a);
        this.currentOperand = '';
        this.operator = undefined;
        this.updateDisplay();
    }

    standarize(number) {
        if (number == '.')
            return '0';
        else if (number[0] == '.')
            return '0' + number;
        else if (number[number.length - 1] == '.')
            return number.slice(1, -1);
        else 
            return number;
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const dotButton = document.querySelector('[data-dot]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendCurrentOperand(button.innerText);
    });
});

dotButton.addEventListener('click', () => {
    calculator.appendCurrentOperand('.');
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.changeOperator(button.innerText);
    });
});

deleteButton.addEventListener('click', () => {
    calculator.popBackCurrentOperand();
});

allClearButton.addEventListener('click', () => {
    calculator.reset();
});

equalButton.addEventListener('click', () => {
    calculator.calculate();
});
