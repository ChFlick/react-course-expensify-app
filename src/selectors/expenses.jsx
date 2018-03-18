import moment from 'moment';

// Get visible expenses
export default (expenses, { text = '', sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const createdAt = moment(expense.createdAt);

        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAt, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAt, 'day') : true;
        const textMatch = !expense.description || expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        const sortField = (() => {
            if (sortBy === 'amount') return 'amount';
            if (sortBy === 'date') return 'createdAt';
        })();

        return b[sortField] - a[sortField];
    });
};
