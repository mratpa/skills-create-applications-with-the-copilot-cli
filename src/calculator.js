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
  console.error('Operations: add, subtract, multiply, divide, modulo, power, sqrt');
  console.error('For sqrt use: node src/calculator.js sqrt <num>');
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
function modulo(n1, n2) {
  if (n2 === 0) throw new Error('modulo by zero');
  return n1 % n2;
}
function power(base, exponent) {
  return Math.pow(base, exponent);
}
function squareRoot(n) {
  if (n < 0) throw new Error('square root of negative number');
  return Math.sqrt(n);
}

// CLI behavior when run directly
if (require.main === module) {
  const opLower = op && String(op).toLowerCase();
  const unaryOps = new Set(['sqrt', 's', 'squareroot']);

  if (!op || (unaryOps.has(opLower) ? a === undefined : (a === undefined || b === undefined))) {
    usage();
    process.exitCode = 1;
    process.exit();
  }

  const n1 = Number(a);
  const n2 = b === undefined ? undefined : Number(b);
  if (!Number.isFinite(n1) || (n2 !== undefined && !Number.isFinite(n2))) {
    console.error('Error: operand(s) must be valid numbers.');
    process.exitCode = 2;
    process.exit();
  }

  let result;
  try {
    switch (opLower) {
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
      case 'modulo':
      case 'mod':
      case '%':
        result = modulo(n1, n2);
        break;
      case 'power':
      case 'pow':
      case '^':
      case '**':
        result = power(n1, n2);
        break;
      case 'sqrt':
      case 's':
      case 'squareroot':
        result = squareRoot(n1);
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
module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };
