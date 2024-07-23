let operator = "";
let firstNum = "";
let secondNum = "";
let result = "";
let calcState = 0; //0 - no input, 1 - first number known, 2 - operator known, 3 second number is known
const maxNumLen = 11;

const display = document.querySelector("#display");

function clear() {
    display.textContent = "";
    firstNum = "";
    secondNum = "";
    operator = "";
    result = "";
    calcState = 0;
    console.log(`calcState = ${calcState}`)
}
const del = document.querySelector("#del");
del.addEventListener("click", clear);

function equalsTo() {
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
}
const equal = document.querySelector("#equal-sign");
equal.addEventListener("click", equalsTo);

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
    console.log(`result before rounding = ${result}`);
    display.textContent = roundToFit(result);
}

function roundToFit(number) {
    //Do nothing if the display content is not a number eg. Error
    if (isNaN(number)) {
        return number;
    }    
    //Check the length of the number before the decimal point
    let roundedLength = Math.round(number).toString().length;
    //Rounding numbers between 0 and -0,5 will remove the negative sign
    console.log(`roundedLength = ${roundedLength}`);
    if (number < 0 && number > -0.5) {
        roundedLength += 1;
    }
    //Check the total length of the number. Minus sign and decimal point also count as characters
    let totalLength = number.toString().length;
    console.log(`totalLength = ${totalLength}`);
    //Check if the rounded result can be displayed. If too long, display "Error"
    if (roundedLength > maxNumLen) {
        number = "Error";
        console.log(number);
        return number;
    }
    //Rounding the result to fit the display
    else if (totalLength > maxNumLen) {
        number = Number(number).toFixed(maxNumLen - (roundedLength + 1));
    }
    number *= 1; //This is to remove trailing zeros that may arise
    console.log(`rounded = ${number}`);
    return number;
}


function add(firstNum, secondNum) {
    result = (Number(firstNum)*10 + Number(secondNum)*10)/10; //Floating point arithmetic is not accurate, it helps to multiply and divide.
}
function subtract(firstNum, secondNum) {
    result = (Number(firstNum)*10 - Number(secondNum)*10)/10; //Floating point arithmetic is not accurate, it helps to multiply and divide.
}
function multiply(firstNum, secondNum) {
    result = (Number(firstNum)*10 * Number(secondNum)*10)/100; //Floating point arithmetic is not accurate, it helps to multiply and divide.
}
function divide(firstNum, secondNum) {
    if (secondNum == 0) {
        result = "Error";
    }
    else {
        result = Number(firstNum) / Number(secondNum);
    }    
}

function numInput(input) {
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
        if (input === "0") {
            return;
        }
        else if (result === "") {
            display.textContent += ".";
        }
        else {
            display.textContent = "";
        }
    }
    display.textContent += input;
    console.log(`calcState = ${calcState}`);
}
const numbers = document.querySelectorAll(".numbers");
// we use the .forEach method to iterate through each num button
numbers.forEach((button) => {
    // and for each one we add a 'click' listener
    button.addEventListener("click", () => numInput(button.textContent));
});

function operatorInput(input) {
    if (calcState < 1 || display.textContent === "Error") {
        alert("Enter the first number");
        return;
    }
    else if (calcState == 1)  {
        firstNum = display.textContent;
        operator = input;
        display.textContent = input;
        calcState = 2;
    }
    else if (calcState == 2) {
        operator = input;
        display.textContent = input;            
    }
    console.log(`calcState = ${calcState}`);
}
const operators = document.querySelectorAll(".operators");
// we use the .forEach method to iterate through each operator button
operators.forEach((button) => {
    // and for each one we add a 'click' listener
    button.addEventListener("click", () => operatorInput(button.textContent));
});

function addDecPoint() {
    if (display.textContent === "" || result !== "") {
        display.textContent = "0.";
        result = "";
    }
    else if (display.textContent.includes(".") || isNaN(display.textContent) || display.textContent.length >= (maxNumLen - 1)) {
        return;
    }
    else {
        display.textContent += ".";
    }
    console.log(`calcState = ${calcState}`);
}
const decimalPoint = document.querySelector("#decimal-point");
decimalPoint.addEventListener("click", addDecPoint);

const sign = document.querySelector("#change-sign");
sign.addEventListener("click", () => {
    if (isNaN(display.textContent) || display.textContent === "") {
        return;
    }
    if (Number(display.textContent) > 0) {
        display.textContent = roundToFit("-" + display.textContent);
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


function backspace() {
    if (calcState == 1 || calcState == 3) {
        if (display.textContent === "" || display.textContent === "Error") {
            return;
        }
        display.textContent = display.textContent.slice(0, -1);
        if (display.textContent === "") {
            calcState -= 1;
        }
    }
    console.log(`calcState = ${calcState}`);
}
const backspaceBtn = document.querySelector("#backspace");
backspaceBtn.addEventListener("click", backspace);

//Handle input from keyboard
window.addEventListener(
    "keydown",
    (event) => {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
  
      switch (event.key) {
        case "Backspace":
            backspace();
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            operatorInput(event.key);
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            numInput(event.key);
            break;
        case "Delete":
          clear();
          break;
        case "Enter":
          equalsTo();6
          break;
        case ".":
        case ",":
          addDecPoint();
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
  
      // Cancel the default action to avoid it being handled twice
      event.preventDefault();
    },
    true,
  );