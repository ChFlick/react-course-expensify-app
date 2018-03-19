import React from 'react';
import { shallow } from 'enzyme';

import { ExpensesSummary } from '../../src/components/ExpensesSummary';

test('should create a summary text', () => {
    const wrapper = shallow(<ExpensesSummary/>);
    expect(wrapper.find('h1').length).toEqual(1);
});

test('should create expenses summary without expenses correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={0}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should create expenses summary with one expense correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={195}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should create expenses summary with more expenses correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={3} expensesTotal={82195}/>);
    expect(wrapper).toMatchSnapshot();
});
