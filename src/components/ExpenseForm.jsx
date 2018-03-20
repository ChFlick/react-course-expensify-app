import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);

        const expense = props.expense || {};

        this.state = {
            description: expense.description || '',
            note: expense.note || '',
            amount: expense.amount ? (expense.amount / 100).toString() : '',
            createdAt: moment(expense.createdAt) || moment(),
            calendarFocused: false,
            error: null,
        };
    };

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState((state) => ({ description }));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;

        if (!amount || amount.match(/^\d+((\.|,)\d{0,2})?$/)) {
            this.setState((state) => ({ amount }));
        }
    };

    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState({ createdAt });
        }
    }

    onCalendarFocusChange = ({ focused }) => {
        this.setState({ calendarFocused: focused });
    }

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState((state) => ({ note }));
    };

    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            this.setState({ error: 'Please provide description and amount.' });
        } else {
            this.setState({ error: null });
            this.props.onSubmit({
                description: this.state.description,
                note: this.state.note,
                amount: parseFloat(this.state.amount.replace(',', '.')) * 100,
                createdAt: this.state.createdAt.valueOf(),
            });
        }
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type="text"
                    placeholder="Description"
                    autoFocus
                    className="text-input"
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input
                    type="text"
                    placeholder="Amount"
                    className="text-input"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onCalendarFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    displayFormat='DD.MM.YYYY'
                />
                <textarea
                    placeholder="Add a note for your expense (optional)"
                    className="textarea"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                >

                </textarea>
                <div>
                    <button className="button">Save Expense</button>
                </div>
            </form>
        );
    }
};
