import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loadingReducer(state = initialState.loading, action) {
  switch (action.type) {
    case types.LAUNCH_PUSH_MESSAGES:
      return true;
    case types.PUSH_MESSAGES_SUCCESS:
      return false;
    default:
      return state;
  }
};

export const getLoading = state => state.loading;