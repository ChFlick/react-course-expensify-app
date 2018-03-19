export default (expenses = []) => {
    if (!Array.isArray(expenses) || expenses.length === 0) {
        return 0;
    }

    return expenses
            .map((expense) => expense.amount)
            .reduce((sum, value) => sum + value);
};
