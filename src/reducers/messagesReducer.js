import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function messagesReducer(state = initialState.messages, action) {
  switch (action.type) {
    case types.FETCH_MESSAGES_SUCCESS:
      return Object.keys(action.payload).map(key => {
        let message = action.payload[key];
        message['objectId'] = key;
        return message;
      });
    default:
      return state;
  }
}

export const getMessages = state => state.messages;