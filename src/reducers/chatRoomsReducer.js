import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chatRoomsReducer(state = initialState.chatRooms, action) {
  switch (action.type) {
    case types.UPDATE_CHATROOMS :
      return action.data.chatrooms;
    default:
      return state;
  }
}
