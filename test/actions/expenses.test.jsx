import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import expenses from '../fixtures/expenses';
import { startEditExpense, startSetExpenses, startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startRemoveExpense }
    from '../../src/actions/expenses';
import database from '../../src/firebase/firebase';

const uid = 'testUID';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};

    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expensesData[id] = { description, note, amount, createdAt };
    });

    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should generate add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2],
    });
});

test('should add expense to store', (done) => {
    const store = createMockStore(defaultAuthState);
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
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is nice',
        createdAt: 1000,
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);

        done();
    });
});

test('should add expense with defaults to store', (done) => {
    const store = createMockStore(defaultAuthState);
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
    const store = createMockStore(defaultAuthState);
    const defaultData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0,
    };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
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

test('should set edit expense to the store', (done) => {
    const store = createMockStore(defaultAuthState);
    const { id } = expenses[0];
    const editedExpenseData = {
        description: 'edited',
        note: 'edited',
        amount: 1234321,
        createdAt: 1234321
    };

    store.dispatch(startEditExpense(id, editedExpenseData)).then(() => {
        const actions = store.getActions();

        expect(actions.length).toEqual(1);
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates: editedExpenseData
        });

        done();
    });
});

test('should edit expense on the database', (done) => {
    const store = createMockStore(defaultAuthState);
    const { id } = expenses[0];
    const { amount, createdAt } = expenses[0];
    const editedExpenseData = {
        description: 'edited',
        note: 'edited',
    };

    store.dispatch(startEditExpense(id, editedExpenseData)).then(() => {
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual({
            amount,
            createdAt,
            ...editedExpenseData
        });
        done();
    });
});

test('should generate remove expense action object', () => {
    const action = removeExpense({ id: '1234' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '1234',
    });
});

test('should set remove expense to the store', (done) => {
    const idToDelete = expenses[0].id;
    const store = createMockStore(defaultAuthState);

    store.dispatch(startRemoveExpense({ id: idToDelete })).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id: idToDelete
        });

        done();
    });
});

test('should remove the expense from the database', (done) => {
    const idToDelete = expenses[0].id;
    const store = createMockStore(defaultAuthState);

    store.dispatch(startRemoveExpense({ id: idToDelete })).then(() => {
        return database.ref(`users/${uid}/expenses/${idToDelete}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(null);
        done();
    });
});

test('should generate set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should set start expenses to store', (done) => {
    const store = createMockStore(defaultAuthState);

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions.length).toEqual(1);
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });

        done();
    });
});
