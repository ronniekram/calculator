const screen = document.getElementById('display');
const keypad = document.querySelector('.keypad');
const toggle = document.getElementById('slide');
let dark = true;

const calculator = {
  display: '0', 
  firstNum: null,
  waiting: true,
  operator: null
};

let { display, firstNum, waiting, operator } = calculator;

const updateDisplay = () => {
  // if (display === '') display = '0';
  screen.value = display;
};

const clearDisplay = () => {
  display = '0';
  firstNum = null;
  waiting = false;
  operator = null;
};


const keySwitch = () => {
  const key = event.target.dataset.key
  switch(key) {
    case "num":
      updateDigit(event.target.textContent);
      break;
    case '+':
    case '-':
    case 'x':
    case '/':
    case '=':
      handleOp(key);
      break;
    case '.':
      addDecimal();
      break;
    case 'clear':
      clearDisplay();
      break;
    case 'delete':
      display = display.slice(0, -1)
      break;
  };
};

const updateDigit = (num) => {
  if (waiting) {
    display = num;
    waiting = false;
  } else {
    display === '0' ? display = num : display += num;
  };
}; 

const addDecimal = () => {
  if (waiting) {
    display = "0.";
    waiting = false;
    return;
  };

  if (!display.includes(".")) display += '.';
};

const handleOp = (nextOp) => {
  const input = display;
  if (operator && waiting) {
    operator = nextOp;
    return;
  }

  if (firstNum === null) {
    firstNum = input;
  } else if (operator) {
    const result = calculate(firstNum, input, operator);
    if (result === Infinity) {
      display = "ERROR!";
    } else {
      display = parseFloat(result.toFixed(7));
      firstNum = result;
    };
  };

  waiting = true;
  operator = nextOp;
}

const calculate = (first, second, operation) => {
  first = parseFloat(first);
  second = parseFloat(second);

  if (operation === '+') return first + second;
  if (operation === '-') return first - second;
  if (operation === 'x') return first * second;
  if (operation === '/') return first / second;

  return second;
};

toggle.addEventListener('click', () => {
  if (dark) {
    document.body.dataset.theme = "light";
    dark = false;
  } else {
    document.body.dataset.theme = "dark";
    dark = true;
  }
});

keypad.addEventListener('click', () => {
  keySwitch();
  updateDisplay();
});

updateDisplay();
