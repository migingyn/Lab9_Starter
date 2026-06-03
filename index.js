class CalculatorError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CalculatorError';
  }
}

// Carries extra context: which field was bad and what value it held.
class InvalidInputError extends CalculatorError {
  constructor(field, value) {
    const reason = value.trim() === ''
      ? `"${field}" cannot be empty`
      : `"${value}" is not a valid number for "${field}"`;
    super(reason);
    this.name = 'InvalidInputError';
    this.field = field;   // which input caused the problem
    this.value = value;   // the offending raw string
  }
}

// No extra data needed beyond the name and message.
class DivisionByZeroError extends CalculatorError {
  constructor() {
    super('Cannot divide by zero');
    this.name = 'DivisionByZeroError';
  }
}

function calculate(first, operator, second) {
  // Validate each field individually so the error knows which one is bad
  if (first.trim() === '' || isNaN(Number(first))) {
    throw new InvalidInputError('first number', first);
  }
  if (second.trim() === '' || isNaN(Number(second))) {
    throw new InvalidInputError('second number', second);
  }

  const a = Number(first);
  const b = Number(second);

  if (operator === '/' && b === 0) {
    throw new DivisionByZeroError();
  }

  switch (operator) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a / b;
  }
}

let form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const output = document.querySelector('output');
  const firstNum = document.querySelector('#first-num').value;
  const secondNum = document.querySelector('#second-num').value;
  const operator = document.querySelector('#operator').value;

  try {
    const result = calculate(firstNum, operator, secondNum);
    output.textContent = result;
    output.style.color = '';
  } catch (err) {
    // instanceof walks the prototype chain, so both subtypes also match CalculatorError
    if (err instanceof InvalidInputError) {
      // Access the extra properties only InvalidInputError carries
      output.textContent = `[${err.name}] ${err.message}`;
      console.warn(`Bad field: "${err.field}", received value: "${err.value}"`);
    } else if (err instanceof DivisionByZeroError) {
      output.textContent = `[${err.name}] ${err.message}`;
    } else if (err instanceof CalculatorError) {
      // Catch-all for any future CalculatorError subclass we haven't handled yet
      output.textContent = `[Calculator error] ${err.message}`;
    } else {
      // Truly unexpected — re-throw so the browser surfaces it properly
      throw err;
    }
    output.style.color = 'red';
    console.error(err);
  } finally {
    // Runs whether the calculation succeeded or failed
    console.log(`Calculation attempted: "${firstNum}" ${operator} "${secondNum}"`);
  }
});

// Global error handler — catches uncaught errors that escape all try/catch blocks
window.onerror = function(message, source, lineno, colno, error) {
  console.log(`[window.onerror] Caught global error: "${message}" at ${source}:${lineno}:${colno}`);
  console.error(error);
  return true; // suppress the browser's default red-console output
};

let errorBtns = Array.from(document.querySelectorAll('#error-btns > button'));

const sampleData = [
  { name: 'Alice', age: 30, role: 'Engineer' },
  { name: 'Bob',   age: 25, role: 'Designer' },
  { name: 'Carol', age: 28, role: 'Manager' },
];

// Console Log
errorBtns[0].addEventListener('click', () => {
  console.log('Console Log demo:', sampleData);
});

// Console Error
errorBtns[1].addEventListener('click', () => {
  console.error('Console Error demo: something went wrong!', { code: 500, message: 'Internal Error' });
});

// Console Count
errorBtns[2].addEventListener('click', () => {
  console.count('button-clicks');
});

// Console Warn
errorBtns[3].addEventListener('click', () => {
  console.warn('Console Warn demo: this action may have side effects.');
});

// Console Assert
errorBtns[4].addEventListener('click', () => {
  console.assert(1 === 2, 'Console Assert demo: 1 does not equal 2');
  console.assert(1 === 1, 'This message will NOT appear because the assertion is true');
});

// Console Clear
errorBtns[5].addEventListener('click', () => {
  console.clear();
});

// Console Dir
errorBtns[6].addEventListener('click', () => {
  console.dir(document.querySelector('form'));
});

// Console dirxml
errorBtns[7].addEventListener('click', () => {
  console.dirxml(document.querySelector('form'));
});

// Console Group Start
errorBtns[8].addEventListener('click', () => {
  console.group('Console Group demo');
  console.log('Inside the group — first message');
  console.log('Inside the group — second message');
  console.groupCollapsed('Nested collapsed group');
  console.log('Inside nested group');
});

// Console Group End
errorBtns[9].addEventListener('click', () => {
  console.groupEnd(); // ends nested group (if open)
  console.groupEnd(); // ends outer group
});

// Console Table
errorBtns[10].addEventListener('click', () => {
  console.table(sampleData);
});

// Start Timer
errorBtns[11].addEventListener('click', () => {
  console.time('demo-timer');
  console.log('Timer started — click "End Timer" to stop it.');
});

// End Timer
errorBtns[12].addEventListener('click', () => {
  console.timeEnd('demo-timer');
});

// Console Trace
errorBtns[13].addEventListener('click', () => {
  function inner() { console.trace('Console Trace demo'); }
  function outer() { inner(); }
  outer();
});

// Trigger a Global Error — no try/catch, so window.onerror picks it up
errorBtns[14].addEventListener('click', () => {
  null.triggerGlobalError(); // TypeError: cannot read properties of null
});
