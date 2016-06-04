import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function firebaseReducer(state = initialState.fbInitialized, action) {
  switch (action.type) {
    case types.FIREBASE_INITIALIZED_SUCCESS:
      return true;

    default:
      return state;
  }
}
