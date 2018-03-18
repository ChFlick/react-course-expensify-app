import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import getVisibleExpenses from './selectors/expenses';
import './styles/styles.scss';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

const store = configureStore();

console.log(store.getState());

store.dispatch(addExpense({description: 'Water bill', amount: 999999}));
store.dispatch(addExpense({description: 'Gas bill', amount: 30000}));
store.dispatch(addExpense({description: 'Rent', amount: 109500, createdAt: 200000}));
store.dispatch(addExpense({description: 'Electricity bill', amount: 100000, createdAt: 17000}));

const state = store.getState();
console.log(getVisibleExpenses(state.expenses, state.filters));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
