import expenses from '../fixtures/expenses';
import getExpensesTotal from '../../src/selectors/expenses-total';

test('should return 0 with nothing', () => {
    const total = getExpensesTotal();
    expect(total).toBe(0);
});

test('should return 0 no array as data', () => {
    const total = getExpensesTotal(500);
    expect(total).toBe(0);
});

test('should return 0 with no expenses', () => {
    const total = getExpensesTotal([]);
    expect(total).toBe(0);
});

test('should correctly add up a single expense', () => {
    const total = getExpensesTotal([expenses[0]]);
    expect(total).toEqual(expenses[0].amount);
});

test('should correctly add up a multiple expense', () => {
    const total = getExpensesTotal(expenses);
    expect(total).toEqual(expenses[0].amount + expenses[1].amount + expenses[2].amount);
});

