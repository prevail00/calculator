let operator;
let firstNum;
let secondNum;
let result;
const maxNumLen = 13;

const display = document.querySelector("#display");

const del = document.querySelector("#del");
del.addEventListener("click", () => {
    clear();
});


const equal = document.querySelector("#equalsign");

equal.addEventListener("click", () => {
    if (secondNum === undefined && display.textContent === "") {
        return;
    }
    operate(operator, firstNum, secondNum);  
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
});

function operate(operator, firstNum, secondNum) {
    if (operator === "+") {
        add(firstNum, secondNum);
    }
    else if (operator === "-") {
        subtract(firstNum, secondNum);
    }
    else if (operator === "*") {
        multiply(firstNum, secondNum);
    }
    else if (operator === "/") {
        divide(firstNum, secondNum);
    }
    else {
        return;
    }
    if (result.toString().length >= maxNumLen) {
        display.textContent = "Too big";
        return;
    }
    updateDisplay(firstNum, secondNum, operator,result);
}


function add(firstNum, secondNum) {
    result = Number(firstNum) + Number(secondNum);
}

function subtract(firstNum, secondNum) {
    result = Number(firstNum) - Number(secondNum);
}

function multiply(firstNum, secondNum) {
    result = Number(firstNum) * Number(secondNum);
}

function divide(firstNum, secondNum) {
    if (secondNum === 0) {
        result = undefined;
        result = "Infinite";
        return;
    }
    result = Number(firstNum) / Number(secondNum);
}

function clear() {
    display.textContent = "";
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
    result = undefined;
}

const numbers = document.querySelectorAll(".numbers");
// we use the .forEach method to iterate through each num button
numbers.forEach((button) => {
    // and for each one we add a 'click' listener
    button.addEventListener("click", () => {
        if (result !== undefined) {
            result = undefined;
            display.textContent = "";
        }
        if (display.textContent.length >= maxNumLen) {
            return;
        }

        if (firstNum !== undefined) {
           if (secondNum === undefined) {
            secondNum = "";
            secondNum += button.textContent;
           }
           else {
            secondNum += button.textContent;
           }
           updateDisplay(firstNum, secondNum, operator,result);
           return;
        }
        display.textContent += button.textContent;
        
    });
  });

const operators = document.querySelectorAll(".operators");
// we use the .forEach method to iterate through each operator button
operators.forEach((button) => {
    // and for each one we add a 'click' listener
    button.addEventListener("click", () => {
        if (result !== undefined) {
            firstNum = result;
            result = undefined;
        }
        if (display.textContent === "") {
            if (firstNum === undefined) {
                alert("Enter the first number");
                return;
            }
            operator = button.textContent;
            return;    
        }
        if (firstNum === undefined) {
            firstNum = display.textContent;
        }
        operator = button.textContent;
        updateDisplay(firstNum, secondNum, operator,result);
    });
  });

  function updateDisplay(firstNum, secondNum, operator, result) {
    if (operator !== undefined) {
        display.textContent = `${firstNum}${operator}`;
    }
    if (secondNum !== undefined) {
        display.textContent = `${firstNum}${operator}${secondNum}`;
    }
    if (result !== undefined) {
        display.textContent = `${firstNum}${operator}${secondNum}=${result}`;
    }
  }
