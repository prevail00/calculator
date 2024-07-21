let operator = "";
let firstNum = "";
let secondNum = "";
let result = "";
let calcState = 0; //0 - no input, 1 - first number known, 2 - operator known, 3 second number is known
const maxNumLen = 11;

const display = document.querySelector("#display");

const del = document.querySelector("#del");
del.addEventListener("click", () => {
    clear();
    console.log(`calcState = ${calcState}`);
});


const equal = document.querySelector("#equal-sign");

equal.addEventListener("click", () => {
    if (calcState < 2) {
        return;
    }
    else if (calcState < 3) {
        alert("Enter second number");
        return;
    }
    secondNum = display.textContent;
    operate(operator, firstNum, secondNum);  
    firstNum = result;
    secondNum = "";
    operator = "";
    calcState = 1;
    console.log(`calcState = ${calcState}`);
});

function operate(operator, firstNum, secondNum) {
    console.log(`firstNum = ${firstNum}`);
    console.log(`operator = ${operator}`);
    console.log(`secondNum = ${secondNum}`);
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
    console.log(`result = ${result}`);
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
    calcState = 0;
}

const numbers = document.querySelectorAll(".numbers");
// we use the .forEach method to iterate through each num button
numbers.forEach((button) => {
    // and for each one we add a 'click' listener
    button.addEventListener("click", () => {
        if (calcState < 1) {
            calcState = 1;
        }
        else if (calcState == 1 && result !== "") {
            result = "";
            display.textContent = "";
        }
        else if (calcState == 2) {
            calcState = 3;
        }
        if (isNaN(display.textContent)) {
            display.textContent = "";
        }
        if (display.textContent.length >= maxNumLen) {
            return;
        }
        if (display.textContent === "0") {
            if (button.textContent === "0") {
                return;
            }
            else if (result === "") {
                display.textContent += ".";
            }
            else {
                display.textContent = "";
            }
        }
        display.textContent += button.textContent;
        console.log(`calcState = ${calcState}`);
    });
  });

const operators = document.querySelectorAll(".operators");
// we use the .forEach method to iterate through each operator button
operators.forEach((button) => {
    // and for each one we add a 'click' listener
    button.addEventListener("click", () => {
        if (calcState < 1 || display.textContent === "Error") {
            alert("Enter the first number");
            return;
        }
        else if (calcState == 1)  {
            firstNum = display.textContent;
            operator = button.textContent;
            display.textContent = button.textContent;
            calcState = 2;
        }
        else if (calcState == 2) {
            operator = button.textContent;
            display.textContent = button.textContent;            
        }
        console.log(`calcState = ${calcState}`);
    });
  });

const decimalPoint = document.querySelector("#decimal-point");

decimalPoint.addEventListener("click", () => {
    if (display.textContent === "" || result !== "") {
        display.textContent = "0.";
        result = "";
    }
    else if (display.textContent.includes(".") || isNaN(display.textContent)) {
        return;
    }
    else {
        display.textContent += decimalPoint.textContent;
    }
    console.log(`calcState = ${calcState}`);
});

const sign = document.querySelector("#change-sign");

sign.addEventListener("click", () => {
    if (isNaN(display.textContent) || display.textContent === "") {
        return;
    }
    if (Number(display.textContent) > 0) {
        display.textContent = "-" + display.textContent;
    }
    else {
        display.textContent = Math.abs(Number(display.textContent));
    }
    if (calcState > 0) {
        if (calcState > 2) {
            secondNum = display.textContent;
        }
        else {
            firstNum = display.textContent;
        }   
    }
    console.log(`calcState = ${calcState}`);
});

/*const backspace = document.querySelector("#backspace");

backspace.addEventListener("click", () => {
    if (display.textContent === "") {
        return;
    }
    display.textContent = display.textContent.slice(0, -1); 
});*/