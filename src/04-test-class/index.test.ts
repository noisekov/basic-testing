import { getBankAccount, InsufficientFundsError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(300).getBalance()).toBe(300);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(300).withdraw(400)).toThrow(
      new InsufficientFundsError(300),
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      getBankAccount(100).transfer(400, getBankAccount(100)),
    ).toThrow(new InsufficientFundsError(100));
  });

  test('should throw error when transferring to the same account', () => {
    const createdAccount = getBankAccount(100);
    expect(() => createdAccount.transfer(100, createdAccount)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    expect(getBankAccount(100).deposit(400).getBalance()).toBe(500);
  });

  test('should withdraw money', () => {
    expect(getBankAccount(300).withdraw(100).getBalance()).toBe(200);
  });

  test('should transfer money', () => {
    expect(
      getBankAccount(500).transfer(499, getBankAccount(200)).getBalance(),
    ).toBe(1);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
