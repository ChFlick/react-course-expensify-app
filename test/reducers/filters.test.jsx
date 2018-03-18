import moment from 'moment';

import filtersReducer from '../../src/reducers/filters';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
    });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY', sortBy: 'amount' });

    expect(state.sortBy).toEqual('amount');
});

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
    };
    const state = filtersReducer(currentState, { type: 'SORT_BY', sortBy: 'date' });

    expect(state.sortBy).toEqual('date');
});

test('should set text filter', () => {
    const text = 'filterText';
    const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text: text });

    expect(state.text).toEqual(text);
});

test('should set start date filter', () => {
    const startDate = moment(0);
    const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate: startDate });

    expect(state.startDate).toEqual(startDate);
});

test('should set end date filter', () => {
    const endDate = moment(0);
    const state = filtersReducer(undefined, { type: 'SET_END_DATE', endDate: endDate });

    expect(state.endDate).toEqual(endDate);
});

