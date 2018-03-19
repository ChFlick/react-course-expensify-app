import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk';

const composedEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer,
    }),
    composedEnhancers(applyMiddleware(thunk))
);
