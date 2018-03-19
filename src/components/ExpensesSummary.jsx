import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import 'numeral/locales/de';

import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

numeral.locale('de');

export const ExpensesSummary = (props) => (
    <p>
        Viewing {props.expenses.length} expenses totalling {numeral(getExpensesTotal(props.expenses) / 100).format('0.0[,]00$')}
    </p>
);

const matchStateToProps = (state) => ({
    expenses: getVisibleExpenses(state.expenses, state.filters),
});

export default connect(matchStateToProps)(ExpensesSummary);
