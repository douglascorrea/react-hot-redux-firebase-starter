import firebaseApi from '~/api/firebase';

import * as types from './actionTypes';
import { authLoggedIn } from './authActions';
import {
  ajaxCallError,
  beginAjaxCall,
} from './ajaxStatusActions';

export function userCreatedSuccess() {
  return {
    type: types.USER_CREATED_SUCCESS,
  };
}

export function userLoadedSuccess(user) {
  return {
    type: types.USER_LOADED_SUCCESS,
    payload: extractUserProperties(user),
  };
}

export function userIsAdminSuccess() {
  return {
    type: types.USER_IS_ADMIN_SUCCESS,
  };
}

function extractUserProperties(firebaseUser) {
  const user = {};
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
    'isAdmin',
    'roomId',
  ];
  userProperties.forEach((prop) => {
    if (prop in firebaseUser && firebaseUser[prop]) {
      user[prop] = firebaseUser[prop];
    }
  });
  return user;
}

export function userCreated(user) {
  return (dispatch) => {
    firebaseApi.databaseSet(
      `/users/${user.uid}`,
      extractUserProperties(user),
    ).then(() => {
        dispatch(authLoggedIn(user.uid));
        dispatch(userCreatedSuccess());
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        // @TODO better error handling
        throw(error);
      });
  };
}

export function updateUser(user) {
  return dispatch => {
    const cleanUser = extractUserProperties(user);
    return firebaseApi.databaseSet(
      `/users/${user.uid}`,
      cleanUser,
    ).then(() => {
      dispatch(userLoadedSuccess(cleanUser));
    }).catch(error => {
      dispatch(ajaxCallError(error));
    });
  };
}
