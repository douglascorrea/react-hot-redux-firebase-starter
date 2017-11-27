import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {assignToNew, match} from '../utils';

export default function chatReducer(state = initialState.chat, action) {
  return match(action.type)
    .on(types.SET_ACTIVE_CHAT, () => assignToNew(state, {
      activeChat: action.chat,
      activeChatMessages: []
    }))
    .on(types.ADD_CHAT, () => assignToNew(state, {
      chats: state.chats.concat(action.chat)
    }))
    .on(types.MODIFY_CHAT, () => assignToNew(state, {
      chats: state.chats.map(chat => {
        if(chat.key === action.chat.key) {
          return assignToNew({}, action.chat);
        }
        return chat;
      })
    }))
    .on(types.ADD_MESSAGE, () => assignToNew(state, {
      activeChatMessages: state.activeChatMessages.concat(action.message)
    }))
    .otherwise(() => state);
}
