import moment from 'moment';
import expenses from '../fixtures/expenses';
import getVisibleExpenses from '../../src/selectors/expenses';

test('should filter by text value', () => {
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined,
    };

    const result = getVisibleExpenses(expenses, filters);
    expect(result).toContain(expenses[0]);
    expect(result).toContain(expenses[1]);
});

test('should filter without text value', () => {
    const filters = {
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined,
    };

    const result = getVisibleExpenses(expenses, filters);
    expenses.map((ele) => expect(result).toContain(ele));
});

test('should filter by start date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0).add(1, 'day'),
        endDate: undefined,
    };

    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([expenses[1]]);
});

test('should filter by end date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).subtract(1, 'day'),
    };

    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([expenses[2]]);
});

test('should filter by start and end date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0).subtract(1, 'day'),
        endDate: moment(0).add(1, 'day'),
    };

    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([expenses[0]]);
});

test('should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined,
    };

    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([expenses[1], expenses[0], expenses[2]]);
});

test('should sort by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined,
    };

    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});
