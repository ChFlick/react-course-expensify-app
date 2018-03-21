import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import './styles/styles.scss';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import Modal from 'react-modal';

import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';

const appRoot = document.getElementById('app');

Modal.setAppElement(document.getElementById('app'));

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, appRoot);
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, appRoot);

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));

        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/'){
                history.push('/dashboard');
            }
        });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});
