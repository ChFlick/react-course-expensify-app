import moment from 'moment';

const filters = {
    text: '',
    sortBy: 'date',
    startDate: null,
    endDate: null,
};

const filtersWithData = {
    text: 'bills',
    sortBy: 'amount',
    startDate: moment(0),
    endDate: moment(0).add(3, 'days'),
};

export { filters, filtersWithData };
