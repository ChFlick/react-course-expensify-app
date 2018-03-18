import moment from 'moment';

import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../../src/actions/filters';

describe('setTextFilter', () => {
    test('should generate set text filter action object with provided value', () => {
        const action = setTextFilter('textFilter');
        expect(action).toEqual({
            type: 'SET_TEXT_FILTER',
            text: 'textFilter',
        });
    });

    test('should generate set text filter action object with default value', () => {
        const action = setTextFilter();
        expect(action).toEqual({
            type: 'SET_TEXT_FILTER',
            text: '',
        });
    });
});

describe('sortByDate', () => {
    test('should generate sort by date action object', () => {
        const action = sortByDate();
        expect(action).toEqual({
            type: 'SORT_BY',
            sortBy: 'date',
        });
    });
});

describe('sortByAmount', () => {
    test('should generate sort by amount action object', () => {
        const action = sortByAmount();
        expect(action).toEqual({
            type: 'SORT_BY',
            sortBy: 'amount',
        });
    });
});

describe('setStartDate', () => {
    test('should generate set startDate action object', () => {
        const startDate = moment(0);
        const action = setStartDate(startDate);
        expect(action).toEqual({
            type: 'SET_START_DATE',
            startDate: startDate,
        });
    });
});

describe('setEndDate', () => {
    test('should generate set endDate action object', () => {
        const endDate = moment(0);
        const action = setEndDate(endDate);
        expect(action).toEqual({
            type: 'SET_END_DATE',
            endDate: endDate,
        });
    });
});
