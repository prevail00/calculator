let operator = "";
let firstNum = "";
let secondNum = "";
let result = "";
const maxNumLen = 13;

const display = document.querySelector("#display");

const del = document.querySelector("#del");
del.addEventListener("click", () => {
    clear();
});


const equal = document.querySelector("#equalsign");

equal.addEventListener("click", () => {
    if (secondNum === "" && display.textContent === "") {
        alert("Enter the second number");
        return;
    }
    secondNum = display.textContent;
    operate(operator, firstNum, secondNum);  
    firstNum = result;
    result = "";
    secondNum = "";
    operator = "";
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
    //Get the length of the rounded result. Minus sign also counts as a character
    let roundedLength = Math.round(result).toString().length;
    if (result < 0 && result > -0.5) {
        roundedLength += 1;
    }
    //Check the total length of the result. Minus sign and decimal point also count as characters
    let totalLength = result.toString().length;
    //Check if the rounded result can be displayed. If too long, display "Error"
    if (roundedLength > maxNumLen) {
        display.textContent = "Error";
        return;
    }
    //Rounding the result to fit the display
    else if (totalLength > maxNumLen) {
        let absResult = Math.abs(result);
        const beforeDecimal = Math.floor(absResult);
        let afterDecimal = absResult - beforeDecimal;
        afterDecimal = Math.round(afterDecimal * Math.pow(10,(maxNumLen - (roundedLength + 1)))) / Math.pow(10,(maxNumLen - (roundedLength + 1)));
        if (result < 0) {
            result = beforeDecimal + afterDecimal;
            result *= -1;
        }
        else {
            result = beforeDecimal + afterDecimal;
        }
    }
    display.textContent = result;
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
    if (secondNum == 0) {
        result = "Error";
    }
    else {
        result = Number(firstNum) / Number(secondNum);
    }    
}

function clear() {
    display.textContent = "";
    firstNum = "";
    secondNum = "";
    operator = "";
    result = "";
}

const numbers = document.querySelectorAll(".numbers");
// we use the .forEach method to iterate through each num button
numbers.forEach((button) => {
    // and for each one we add a 'click' listener
    button.addEventListener("click", () => {
        if (isNaN(display.textContent)) {
            display.textContent = "";
        }
        else if (result !== "") {
            result = "";
            display.textContent = "";
        }
        if (display.textContent.length >= maxNumLen) {
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
        if (display.textContent === "") {
            alert("Enter the first number");
            return;
        }
        if (firstNum !== "") {
            operator = button.textContent;
        }
        else {
            firstNum = display.textContent;
            operator = button.textContent;
        }        
        display.textContent = button.textContent;
    });
  });