/**
 * Created by clementlucas on 07/03/2017.
 */
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chatRoomReducer(state = initialState.chatroom, action) {
  switch (action.type) {
    case types.ROOM_MESSAGES_UPDATED:
      return { ...state, messages: action.value };

    default:
      return state
  }
}
