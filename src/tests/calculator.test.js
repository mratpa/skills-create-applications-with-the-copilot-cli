const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

describe('calculator basic operations', () => {
  test('addition: matches image examples and edge cases', () => {
    expect(add(2, 3)).toBe(5); // image example
    expect(add(0, 0)).toBe(0);
    expect(add(-5, 5)).toBe(0);
    expect(add(2.5, 0.5)).toBeCloseTo(3.0);
  });

  test('subtraction: matches image example and negatives', () => {
    expect(subtract(10, 4)).toBe(6); // image example
    expect(subtract(0, 5)).toBe(-5);
    expect(subtract(-2, -3)).toBe(1);
  });

  test('multiplication: matches image example and zero', () => {
    expect(multiply(45, 2)).toBe(90); // image example
    expect(multiply(0, 100)).toBe(0);
    expect(multiply(-3, 3)).toBe(-9);
  });

  test('division: matches image example and floats', () => {
    expect(divide(20, 5)).toBe(4); // image example
    expect(divide(5, 2)).toBeCloseTo(2.5);
    expect(divide(-10, 2)).toBe(-5);
  });

  test('division by zero throws an error', () => {
    expect(() => divide(1, 0)).toThrow('division by zero');
    expect(() => divide(0, 0)).toThrow('division by zero');
  });

  test('modulo: matches example and edge cases', () => {
    expect(modulo(5, 2)).toBe(1); // image example
    expect(modulo(10, 3)).toBe(1);
    expect(modulo(-4, 3)).toBe(-1);
    expect(() => modulo(1, 0)).toThrow('modulo by zero');
  });

  test('power: matches example and edge cases', () => {
    expect(power(2, 3)).toBe(8); // image example
    expect(power(2, 0)).toBe(1);
    expect(power(2, -1)).toBeCloseTo(0.5);
    expect(power(-2, 3)).toBe(-8);
  });

  test('squareRoot: matches example and edge cases', () => {
    expect(squareRoot(16)).toBe(4); // image example
    expect(squareRoot(2)).toBeCloseTo(Math.sqrt(2));
    expect(() => squareRoot(-1)).toThrow('square root of negative number');
  });
});
