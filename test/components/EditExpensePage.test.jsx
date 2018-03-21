import React from 'react';
import { shallow } from 'enzyme';

import expenses from '../fixtures/expenses';
import { EditExpensePage } from '../../src/components/EditExpensePage';

const expense = expenses[0];
let startEditExpense;
let startRemoveExpense;
let history;
let wrapper;

beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditExpensePage
            expense={expense}
            startEditExpense={startEditExpense}
            startRemoveExpense={startRemoveExpense}
            history={history}
        />
    );
});

test('should render edit expense page correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle edit expense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expense);

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(expense.id, expense);
});

test('should handle remove expense with modal -> remove', () => {
    wrapper.find('button').at(0).simulate('click');
    wrapper.find('button').at(2).simulate('click');

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expense.id});
});

test('should handle remove expense with modal -> cancel', () => {
    wrapper.find('button').at(0).simulate('click');
    wrapper.find('button').at(1).simulate('click');

    expect(history.push).not.toHaveBeenCalled();
    expect(startRemoveExpense).not.toHaveBeenCalled();
});
