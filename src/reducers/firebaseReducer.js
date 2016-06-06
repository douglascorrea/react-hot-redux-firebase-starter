import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function firebaseReducer(state = initialState.firebase, action) {
  switch (action.type) {
    case types.FIREBASE_INITIALIZED_SUCCESS:
      return Object.assign(state, {initialized: true});

    default:
      return state;
  }
}
