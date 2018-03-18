import React from 'react';
import { shallow } from 'enzyme';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

import { ExpenseListFilters } from '../../src/components/ExpenseListFilters';
import { filters, filtersWithData } from '../fixtures/filters';

let setTextFilter;
let sortByDate;
let sortByAmount;
let setStartDate;
let setEndDate;
let wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();

    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );
});

test('should render expense list filter correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render expense list filter with data correctly', () => {
    wrapper.setProps({ filters: filtersWithData });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    const event = { target: { value: 'TEST' } };
    wrapper.find('input').simulate('change', event);

    expect(setTextFilter).toHaveBeenLastCalledWith(event.target.value);
});

test('should sort by date', () => {
    const event = { target: { value: 'date' } };
    wrapper.setProps({ filters: filtersWithData });
    wrapper.find('select').simulate('change', event);

    expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
    const event = { target: { value: 'amount' } };
    wrapper.find('select').simulate('change', event);

    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {
    const startDate = moment(0);
    const endDate = moment(0).add(2, 'days');

    wrapper.find(DateRangePicker).prop('onDatesChange')({startDate, endDate});

    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle calendar focus change', () => {
    const calendarFocused = 'endDate';
    wrapper.find(DateRangePicker).prop('onFocusChange')(calendarFocused);

    expect(wrapper.state('calendarFocused')).toEqual(calendarFocused);
});
