import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import 'numeral/locales/de';

import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

numeral.locale('de');

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => (
    <p>
        Viewing {expenseCount} expense{expenseCount !== 1 && 's'} totalling {numeral(expensesTotal / 100).format('0.0[,]00$')}
    </p>
);

const matchStateToProps = (state) => {
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: getExpensesTotal(visibleExpenses),
    };
};

export default connect(matchStateToProps)(ExpensesSummary);
