import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import {firebaseConfig} from '../config';
import * as firebase from 'firebase/firebase-browser';
import firebaseApi from '../api/firebase';
import {push} from 'react-router-redux';
import toastr from 'toastr';

function initilizeFirebaseIfNotYet(dispatch, getState) {
  if (!getState().firebase.initialized) {
    dispatch(initializeFirebase());
  }
}

function transformFirebaseUser(firebaseUser) {

  const storeUser = {};
  const userProperties = [
    'displayName',
    'email',
    'emailVerified',
    'isAnonymous',
    'photoURL',
    'providerData',
    'providerId',
    'refreshToken',
    'uid',
    'isAdmin'
  ];

  userProperties.map((prop) => {
    if (prop in firebaseUser) {
      storeUser[prop] = firebaseUser[prop];
    }
  });

  return storeUser;
}

export function firebaseInitializedSuccess() {

  return {type: types.FIREBASE_INITIALIZED_SUCCESS};
}

export function userLoggedInSuccess(user) {
  return {
    type: types.USER_LOGGED_IN_SUCCESS, user
  };
}

export function userLoggedOutSuccess() {
  return {type: types.USER_LOGGED_OUT_SUCCESS};
}

export function initializeFirebase() {
  return dispatch => {

    dispatch(beginAjaxCall());
    firebase.initializeApp(firebaseConfig);
    dispatch(firebaseInitializedSuccess());
  };
}

export function createUserWithEmailAndPassword(user) {
  return (dispatch, getState) => {

    initilizeFirebaseIfNotYet(dispatch, getState);

    dispatch(beginAjaxCall());
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(user => {
      return firebaseApi.databaseSet('/users/' + user.uid, transformFirebaseUser(user))
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function signInWithEmailAndPassword(user) {
  return (dispatch, getState) => {

    initilizeFirebaseIfNotYet(dispatch, getState);

    dispatch(beginAjaxCall());
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
  };
}

export function signOut() {
  return (dispatch, getState) => {

    initilizeFirebaseIfNotYet(dispatch, getState);

    dispatch(beginAjaxCall());
    return firebase.auth().signOut()
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
  };
}

export function onAuthStateChanged() {
  return (dispatch, getState) => {

    initilizeFirebaseIfNotYet(dispatch, getState);
    dispatch(beginAjaxCall());
    return firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        dispatch(userLoggedInSuccess(transformFirebaseUser(user)));
        if (window.location.pathname === '/login') {
          dispatch(push('/'));
        }
      } else {
        dispatch(userLoggedOutSuccess());
      }
    });
  };
}

function redirect(replace, pathname, nextPathName, warning = false) {
  replace({
    pathname: pathname,
    state: {nextPathname: nextPathName}
  });
  if (warning) {
    toastr.error(warning);
  }
}

export function requireAuth(nextState, replace) {
  return (dispatch, getState) => {
    if (!getState().user.isLogged) {
      redirect(replace, '/login', nextState.location.pathname, 'You need to be logged to access this page');
    }
  };
}



export function requireAdmin(nextState, replace) {
  return (dispatch, getState) => {
    console.log(firebase.auth());
    if (getState().user.uid !== undefined) {
      const uid = getState().user.uid;
      firebaseApi.databaseGetByKeyOnce('/isAdmin/', uid)
        .then((userSnapshot) => {
          if (userSnapshot.exists()) {
            user.isAdmin = userSnapshot.child(user.uid).val();
          } else {
            user.isAdmin = false;
            redirect(replace, '/', nextState.location.pathname, 'You need to be Admin to access this page');
          }
          dispatch(userLoggedInSuccess(transformFirebaseUser(user)));
        });
    } else {
      redirect(replace, '/', nextState.location.pathname, 'You need to be Admin to access this page');
    }
  }
}
