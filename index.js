let form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  let output = document.querySelector('output');
  let firstNum = document.querySelector('#first-num').value;
  let secondNum = document.querySelector('#second-num').value;
  let operator = document.querySelector('#operator').value;
  output.innerHTML = eval(`${firstNum} ${operator} ${secondNum}`);
});

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
