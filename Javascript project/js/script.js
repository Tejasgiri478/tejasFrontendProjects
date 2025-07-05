// Calculator class to handle all calculator operations
class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }

  // Clear all values and reset calculator
  clear() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
    this.shouldResetScreen = false;
  }

  // Delete the last digit
  delete() {
    if (this.shouldResetScreen) return;
    if (this.currentOperand === "0") return;
    if (this.currentOperand.length === 1) {
      this.currentOperand = "0";
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
  }

  // Calculate percentage
  percent() {
    if (this.currentOperand === "0") return;
    this.currentOperand = (parseFloat(this.currentOperand) / 100).toString();
  }

  // Append a number to the current operand
  appendNumber(number) {
    if (this.shouldResetScreen) {
      this.currentOperand = "";
      this.shouldResetScreen = false;
    }

    // If the number is a decimal point
    if (number === ".") {
      if (this.currentOperand.includes(".")) return;
      if (this.currentOperand === "0" || this.currentOperand === "") {
        this.currentOperand = "0";
      }
    }

    // If the current operand is just '0', replace it unless it's a decimal point
    if (this.currentOperand === "0" && number !== ".") {
      this.currentOperand = number;
    } else {
      this.currentOperand += number;
    }
  }

  // Choose an operation
  chooseOperation(operation) {
    if (this.currentOperand === "") return;

    if (this.previousOperand !== "") {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.shouldResetScreen = true;
  }

  // Compute the result
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "÷":
        if (current === 0) {
          this.currentOperand = "Error";
          this.previousOperand = "";
          this.operation = undefined;
          this.shouldResetScreen = true;
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }

    // Format the result to avoid extremely long decimals
    this.currentOperand = this.formatDisplayNumber(computation);
    this.operation = undefined;
    this.previousOperand = "";
    this.shouldResetScreen = true;
  }

  // Format number for display
  formatDisplayNumber(number) {
    if (number === "Error") return "Error";

    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "0";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  // Update the display
  updateDisplay() {
    this.currentOperandElement.innerText = this.formatDisplayNumber(
      this.currentOperand
    );

    if (this.operation != null) {
      this.previousOperandElement.innerText = `${this.formatDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandElement.innerText = "";
    }
  }
}

// Theme toggle functionality
function setupThemeToggle() {
  const themeSwitch = document.getElementById("themeSwitch");

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Set initial theme based on saved preference or system preference
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute("data-theme", "dark");
    themeSwitch.checked = true;
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    themeSwitch.checked = false;
  }

  // Toggle theme when switch is clicked
  themeSwitch.addEventListener("change", function () {
    if (this.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });
}

// Initialize calculator when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Setup theme toggle
  setupThemeToggle();

  // Get DOM elements
  const previousOperandElement = document.getElementById("previousOperand");
  const currentOperandElement = document.getElementById("currentOperand");
  const numberButtons = document.querySelectorAll("[data-number]");
  const operationButtons = document.querySelectorAll("[data-operation]");
  const equalsButton = document.querySelector('[data-action="equals"]');
  const clearButton = document.querySelector('[data-action="clear"]');
  const deleteButton = document.querySelector('[data-action="delete"]');
  const percentButton = document.querySelector('[data-action="percent"]');

  // Create calculator instance
  const calculator = new Calculator(
    previousOperandElement,
    currentOperandElement
  );

  // Update display initially
  calculator.updateDisplay();

  // Add event listeners for number buttons
  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    });
  });

  // Add event listeners for operation buttons
  operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    });
  });

  // Add event listener for equals button
  equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
  });

  // Add event listener for clear button
  clearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
  });

  // Add event listener for delete button
  deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
  });

  // Add event listener for percent button
  percentButton.addEventListener("click", () => {
    calculator.percent();
    calculator.updateDisplay();
  });

  // Add keyboard support
  document.addEventListener("keydown", function (event) {
    // Numbers 0-9
    if (/^[0-9]$/.test(event.key)) {
      calculator.appendNumber(event.key);
      calculator.updateDisplay();
    }
    // Decimal point
    else if (event.key === ".") {
      calculator.appendNumber(event.key);
      calculator.updateDisplay();
    }
    // Operations
    else if (["+", "-"].includes(event.key)) {
      calculator.chooseOperation(event.key);
      calculator.updateDisplay();
    } else if (event.key === "*") {
      calculator.chooseOperation("×");
      calculator.updateDisplay();
    } else if (event.key === "/") {
      calculator.chooseOperation("÷");
      calculator.updateDisplay();
    }
    // Equals (Enter or =)
    else if (event.key === "=" || event.key === "Enter") {
      event.preventDefault();
      calculator.compute();
      calculator.updateDisplay();
    }
    // Delete (Backspace)
    else if (event.key === "Backspace") {
      calculator.delete();
      calculator.updateDisplay();
    }
    // Clear (Escape or Delete)
    else if (event.key === "Escape" || event.key === "Delete") {
      calculator.clear();
      calculator.updateDisplay();
    }
    // Percent (%)
    else if (event.key === "%") {
      calculator.percent();
      calculator.updateDisplay();
    }
  });
});
