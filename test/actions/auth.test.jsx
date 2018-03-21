import * as firebase from '../../src/firebase/firebase';

import { startLogin, login, logout } from '../../src/actions/auth';

let signIn;

beforeEach(() => {
    signIn = jest.fn();

    firebase.firebase = {
        auth: () => ({
            signInWithPopup: signIn
        })
    };
    firebase.googleAuthProvider = 'googleAuth';
    firebase.githubAuthProvider = 'githubAuth';
});

test('should generate login action object', () => {
    const uid = 'someuid';
    const action = login(uid);

    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});

test('startLogin with google works', () => {
    startLogin('google')();
    expect(signIn).toHaveBeenLastCalledWith(firebase.googleAuthProvider);
});

test('startLogin with github works', () => {
    startLogin('github')();
    expect(signIn).toHaveBeenLastCalledWith(firebase.githubAuthProvider);
});

test('startLogin with wrong provider throws error', () => {
    expect(startLogin('someNotExistingProvider')).toThrow();
});

test('should generate logout action object', () => {
    const action = logout();

    expect(action).toEqual({
        type: 'LOGOUT',
    });
});
