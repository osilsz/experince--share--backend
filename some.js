function divide(a, b) {
  console.log(a, b, a / b, b / a);
  return a / b;
}

function calculate() {
  divide(4, 0);  // Error: division by zero
}

console.log(calculate());