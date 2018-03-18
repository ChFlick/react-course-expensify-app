import expenses from '../fixtures/expenses';
import expensesReducer from '../../src/reducers/expenses';

test('should setup default filter values', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id,
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1',
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});

test('should add expense', () => {
    const newExpense = {
        id: 'TEST',
        description: 'TEST',
        note: '',
        amount: 0,
        createdAt: 0,
    };

    const action = {
        type: 'ADD_EXPENSE',
        expense: newExpense,
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([...expenses, newExpense]);
});

test('should edit an expense by id', () => {
    const updates = {
        description: 'TEST',
        note: '',
        amount: 0,
        createdAt: 0,
    };

    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: updates,
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expenses[0], {id: expenses[1].id, ...updates}, expenses[2]]);
});

test('should not edit an expense if id not found', () => {
    const updates = {
        description: 'TEST',
        note: '',
        amount: 0,
        createdAt: 0,
    };

    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: updates,
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});
