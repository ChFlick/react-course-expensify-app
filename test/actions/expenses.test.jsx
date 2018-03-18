import { addExpense, editExpense, removeExpense } from '../../src/actions/expenses';

describe('addExpense', () => {
    test('should generate add expense action object with provided values', () => {
        const expenseData = {
            description: 'desc',
            note: 'not',
            amount: 333,
            createdAt: 1234,
        };

        const action = addExpense(expenseData);
        expect(action).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                ...expenseData,
                id: expect.any(String),
            },
        });
    });

    test('should generate add expense action object with default values', () => {
        const action = addExpense();
        expect(action).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                description: '',
                note: '',
                amount: 0,
                createdAt: 0,
            },
        });
    });
});

describe('editExpense', () => {
    test('should generate edit expense action object', () => {
        const action = editExpense('1234', { a: 'a'});
        expect(action).toEqual({
            type: 'EDIT_EXPENSE',
            id: '1234',
            updates: {a: 'a'},
        });
    });
});


describe('removeExpense', () => {
    test('should generate remove expense action object', () => {
        const action = removeExpense({ id: '1234'});
        expect(action).toEqual({
            type: 'REMOVE_EXPENSE',
            id: '1234',
        });
    });
});
