import createStore, { Store } from 'unistore';
import { connect } from 'unistore/react';
import firebase from './firebase';
import { register, sendEmailVerification } from './services/login';

type State = {
  count: number;
  accountStatus: 'unauthenticated' | 'authenticated' | 'registered';
  idToken?: string;
};

export const baseStore = createStore<State>({
  count: 0,
  accountStatus: null
});

export const actions = (store: Store<State>) => ({
  up: () => store.setState(() => ({ count: store.getState().count + 1 })),
  down: () => store.setState(() => ({ count: store.getState().count - 1 })),

  async loginWithToken(token) {
    return { accountStatus: 'authenticated' };
  },

  async registerUser(state, userData) {
    console.log('step 1: register user');
    await register(userData);

    console.log('step 2: email verification');
    await sendEmailVerification();

    console.log('step 3: update account status');
    return { accountStatus: 'registered' };
  }
});

baseStore.subscribe(state => {
  if (state.accountStatus === 'authenticated' && window.location.href.includes('auth')) {
    window.location.replace('/');
  }
});

firebase.auth().onAuthStateChanged(async user => {
  if (user && user.emailVerified) {
    const idToken: string = await firebase.auth().currentUser.getIdToken(true);
    localStorage.setItem('authToken', idToken);

    baseStore.setState({ accountStatus: 'authenticated', idToken });
  } else {
    baseStore.setState({ accountStatus: 'unauthenticated' });
  }
});
