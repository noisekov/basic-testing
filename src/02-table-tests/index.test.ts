import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 3, action: Action.Add, expected: 5 },
  { a: 13, b: 3, action: Action.Subtract, expected: 10 },
  {
    a: 9,
    b: 3,
    action: Action.Multiply,
    expected: 27,
  },
  {
    a: 9,
    b: 3,
    action: Action.Divide,
    expected: 3,
  },
  {
    a: 3,
    b: 3,
    action: Action.Exponentiate,
    expected: 27,
  },
  {
    a: 3,
    b: 3,
    action: 'invalid action',
    expected: null,
  },
  {
    a: Symbol,
    b: BigInt,
    action: Action.Add,
    expected: null,
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)('Add', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
