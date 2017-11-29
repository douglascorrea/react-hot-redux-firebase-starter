import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function messagesReducer(state = initialState.messages, action) {
  switch (action.type) {
    case types.FETCH_MESSAGES_SUCCESS:
      return [...state, action.payload];
    default:
      return state;
  }
}

export const getMessages = state => state.messages;