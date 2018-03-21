import { firebase, googleAuthProvider, githubAuthProvider } from '../firebase/firebase';

export const login = (uid) => {
    return {
        type: 'LOGIN',
        uid
    };
};

export const startLogin = (providerName) => {
    return () => {
        if (providerName === 'google') {
            return firebase.auth().signInWithPopup(googleAuthProvider);
        } else if (providerName === 'github') {
            return firebase.auth().signInWithPopup(githubAuthProvider);
        } else {
            throw new Error('invalid authentication provider');
        }
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT',
    };
};

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};
