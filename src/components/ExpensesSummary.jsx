import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import 'numeral/locales/de';
import { Link } from 'react-router-dom';

import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

numeral.locale('de');

export const ExpensesSummary = ({ expenseCount, hiddenExpenseCount, expensesTotal }) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    const formattedTotal = numeral(expensesTotal / 100).format('0.0[,]00$');

    const hiddenExpenseWord = hiddenExpenseCount === 1 ? 'expense' : 'expenses';
    const hiddenExpensePronoun = hiddenExpenseCount === 1 ? 'is' : 'are';

    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">
                    Viewing <span>{expenseCount} </span> {expenseWord} totalling <span>{formattedTotal}</span>
                </h1>
                <h3 className="page-header__subtitle">
                    {hiddenExpenseCount > 0 ?
                        `There ${hiddenExpensePronoun} ${hiddenExpenseCount} ${hiddenExpenseWord} hidden by filters.` :
                        'All expenses visible.'
                    }
                </h3>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    );
};

const matchStateToProps = (state) => {
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

    return {
        expenseCount: visibleExpenses.length,
        hiddenExpenseCount: state.expenses.length - visibleExpenses.length,
        expensesTotal: getExpensesTotal(visibleExpenses),
    };
};

export default connect(matchStateToProps)(ExpensesSummary);
