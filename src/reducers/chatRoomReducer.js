/**
 * Created by clementlucas on 07/03/2017.
 */
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chatReducer(state = initialState.chat, action) {
  switch (action.type) {
    case types.CHATROOMS_LOAD_SUCCESS:
      return { ...state, chatrooms: action.chatrooms };
      return Object.assign({}, state, { chatrooms: action.chatrooms });
    case types.CHATROOM_LOAD_SUCCESS:
      const chatroom = { ...action.chatroom, messages: [] };
      return Object.assign({}, state, {currentChatRoom: chatroom});
    case types.CHATROOM_UPDATE_SUCCESS:
      return Object.assign({}, state, {currentChatRoom: action.chatroom});
    case types.CHATROOM_LEAVED_SUCCESS:
      return Object.assign({}, state, {currentChatRoom: null});
    case types.CHATROOM_NEW_MESSAGE:
      if (!state.currentChatRoom) {
        return state
      }
      const newMessage = action.message;
      let update = {
        ...state.currentChatRoom,
        messages: state.currentChatRoom.messages.concat([newMessage])
      };
      return Object.assign({}, state, {currentChatRoom: update});
    case types.AUTH_LOGGED_OUT_SUCCESS:
      return initialState.chat;
    default:
      return state
  }
}
