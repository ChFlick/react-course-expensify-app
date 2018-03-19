import React from 'react';
import { shallow } from 'enzyme';

import expenses from '../fixtures/expenses';
import { ExpensesSummary } from '../../src/components/ExpensesSummary';

test('should create a summary text', () => {
    const wrapper = shallow(<ExpensesSummary expenses={[]}/>);
    expect(wrapper.find('p').length).toEqual(1);
});

test('should create expenses summary without expenses correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenses={[]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should create expenses summary with one expense correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenses={[expenses[0]]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should create expenses summary with more expenses correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenses={expenses}/>);
    expect(wrapper).toMatchSnapshot();
});
