import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

import ExpenseForm from '../../src/components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm without data', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', { preventDefault: () => { } });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
    const value = 'newDescription';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', { target: { value } });

    expect(wrapper.state('description')).toEqual(value);
});

test('should set note on input change', () => {
    const value = 'new note value';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', { target: { value } });

    expect(wrapper.state('note')).toEqual(value);
});

test('should set amout with valid input', () => {
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', { target: { value } });

    expect(wrapper.state('amount')).toEqual(value);
});

test('should not set amout with invalid input', () => {
    const value = '23.505';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', { target: { value } });

    expect(wrapper.state('amount')).toEqual('');
});

test('should call onSubmit prop for valid from submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm onSubmit={onSubmitSpy} expense={expenses[0]} />);

    wrapper.find('form').simulate('submit', { preventDefault: () => { } });

    expect(wrapper.state('error')).toEqual(null);
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt,
    });
});

test('should set new date on date change', () => {
    const newDate = moment(0);
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find(SingleDatePicker).prop('onDateChange')(newDate);

    expect(wrapper.state('createdAt')).toEqual(newDate);
});

test('should set calendar focus on focus change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused });

    expect(wrapper.state('calendarFocused')).toEqual(focused);
});

