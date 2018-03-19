import moment from 'moment';

export default [{
    id: '1',
    description: 'coffee',
    note: '',
    amount: 195,
    createdAt: 0,
},
{
    id: '2',
    description: 'rent',
    note: '',
    amount: 75000,
    createdAt: moment(0).add(2, 'days').valueOf(),
},
{
    id: '3',
    description: 'shopping',
    note: '',
    amount: 7000,
    createdAt: moment(0).subtract(2, 'days').valueOf(),
}];
