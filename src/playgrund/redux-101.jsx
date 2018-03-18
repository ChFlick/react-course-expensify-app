import { createStore } from 'redux';

// Action generators - functions returning action objects
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy,
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy,
});

const setCount = ({ count = 0 } = {}) => ({
    type: 'SET',
    count,
});

const resetCount = () => ({
    type: 'RESET',
});


// Reducers
const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy,
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy,
            };
        case 'RESET':
            return {
                count: 0,
            };
        case 'SET':
            return {
                count: action.count,
            };
        default:
            return state;
    }
};

const store = createStore(countReducer);

store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 3 }));
store.dispatch(incrementCount());

store.dispatch(decrementCount());
store.dispatch(decrementCount({decrementBy: 44}));
store.dispatch(decrementCount());

store.dispatch(resetCount());

store.dispatch(setCount({count: 100}));
