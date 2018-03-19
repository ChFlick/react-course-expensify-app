import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import expenses from '../fixtures/expenses';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../src/actions/expenses';
import database from '../../src/firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('should generate add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2],
    });
});

test('should add expense to store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is nice',
        createdAt: 1000,
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions.length).toEqual(1);
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData,
            },
        });

        done();
    });
});

test('should add expense to database', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is nice',
        createdAt: 1000,
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);

        done();
    });
});

test('should add expense with defaults to store', (done) => {
    const store = createMockStore({});
    const defaultData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0,
    };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions.length).toEqual(1);
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultData,
            },
        });

        done();
    });
});

test('should add expense with defaults to database', (done) => {
    const store = createMockStore({});
    const defaultData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0,
    };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultData);

        done();
    });
});

test('should generate edit expense action object', () => {
    const action = editExpense('1234', { a: 'a' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '1234',
        updates: { a: 'a' },
    });
});


test('should generate remove expense action object', () => {
    const action = removeExpense({ id: '1234' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '1234',
    });
});
