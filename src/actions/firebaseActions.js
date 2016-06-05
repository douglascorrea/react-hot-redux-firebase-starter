import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import * as firebase from 'firebase/firebase-browser';

function initilizeFirebaseIfNotYet(dispatch, getState) {
  if (!getState().fbInitialized) {
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
    'uid'
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

export function userCreatedSuccess(user) {
  return {
    type: types.USER_CREATED_SUCCESS, user
  };
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
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyB9QFe2_Yicu6-YxU9xPZlQb9y_n1YpHhg",
      authDomain: "react-redux-pluralsight-9c5bd.firebaseapp.com",
      databaseURL: "https://react-redux-pluralsight-9c5bd.firebaseio.com",
      storageBucket: "react-redux-pluralsight-9c5bd.appspot.com"
    };
    dispatch(beginAjaxCall());
    firebase.initializeApp(config);
    dispatch(firebaseInitializedSuccess());
  };
}

export function createUserWithEmailAndPassword(user) {
  return function (dispatch, getState) {

    initilizeFirebaseIfNotYet(dispatch, getState);

    dispatch(beginAjaxCall());
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(user => {
      dispatch(userCreatedSuccess(transformFirebaseUser(user)));
    }).catch(error => {
      throw(error);
    });
  };
}

export function signInWithEmailAndPassword(user) {
  return function (dispatch, getState) {

    initilizeFirebaseIfNotYet(dispatch, getState);

    dispatch(beginAjaxCall());
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .catch(error => {
        throw(error);
      });
  };
}

export function signOut() {
  return function (dispatch, getState) {

    initilizeFirebaseIfNotYet(dispatch, getState);

    dispatch(beginAjaxCall());
    return firebase.auth().signOut()
      .catch(error => {
        throw(error);
      });
  };
}

export function onAuthStateChanged() {
  return function (dispatch, getState) {

    initilizeFirebaseIfNotYet(dispatch, getState);
    dispatch(beginAjaxCall());
    return firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        dispatch(userLoggedInSuccess(transformFirebaseUser(user)));
      } else {
        dispatch(userLoggedOutSuccess());
      }
    });
  };
}

