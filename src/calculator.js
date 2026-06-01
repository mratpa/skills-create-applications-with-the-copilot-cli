#!/usr/bin/env node
// calculator.js
// Supported operations: addition (add), subtraction (subtract), multiplication (multiply), division (divide)
// Usage examples:
//   node src/calculator.js add 2 3        -> 5
//   node src/calculator.js subtract 5 2   -> 3
//   node src/calculator.js multiply 3 4   -> 12
//   node src/calculator.js divide 10 2    -> 5

const [,, op, a, b] = process.argv;

function usage() {
  console.error('Usage: node src/calculator.js <operation> <num1> <num2>');
  console.error('Operations: add, subtract, multiply, divide');
}

// Arithmetic functions exported for testing and reuse
function add(n1, n2) {
  return n1 + n2;
}
function subtract(n1, n2) {
  return n1 - n2;
}
function multiply(n1, n2) {
  return n1 * n2;
}
function divide(n1, n2) {
  if (n2 === 0) throw new Error('division by zero');
  return n1 / n2;
}

// CLI behavior when run directly
if (require.main === module) {
  if (!op || a === undefined || b === undefined) {
    usage();
    process.exitCode = 1;
    process.exit();
  }

  const n1 = Number(a);
  const n2 = Number(b);
  if (!Number.isFinite(n1) || !Number.isFinite(n2)) {
    console.error('Error: both operands must be valid numbers.');
    process.exitCode = 2;
    process.exit();
  }

  let result;
  try {
    switch (op.toLowerCase()) {
      case 'add':
      case '+':
        result = add(n1, n2);
        break;
      case 'subtract':
      case 'sub':
      case '-':
        result = subtract(n1, n2);
        break;
      case 'multiply':
      case 'mul':
      case 'x':
      case '*':
        result = multiply(n1, n2);
        break;
      case 'divide':
      case 'div':
      case '/':
        result = divide(n1, n2);
        break;
      default:
        console.error(`Unknown operation: ${op}`);
        usage();
        process.exitCode = 4;
        process.exit();
    }

    // Print numeric result
    if (Number.isInteger(result)) console.log(result);
    else console.log(result);
  } catch (err) {
    console.error('Error: ' + err.message);
    process.exitCode = 3;
    process.exit();
  }
}

// Export functions for tests
module.exports = { add, subtract, multiply, divide };
