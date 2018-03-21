import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    state = {
        modalIsOpen: false
    };

    onEdit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    };

    openModal = () => {
        this.setState(() => ({
            modalIsOpen: true
        }));
    };

    closeModal = () => {
        this.setState(() => ({
            modalIsOpen: false
        }));
    };

    removeExpense = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.closeModal();
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        expense={this.props.expense}
                        onSubmit={this.onEdit}
                    />
                    <button className="button button--secondary" onClick={this.openModal}>
                        Remove Expense
                    </button>

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Remove Expense Modal"
                        className="modal"
                    >
                        <div className="modal__content">
                            Do you really want to remove the expense?
                        </div>
                        <div className="modal__buttons">
                            <button className="button" onClick={this.closeModal}>Cancel</button>
                            <button className="button" onClick={this.removeExpense}>Remove</button>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (id) => dispatch(startRemoveExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
