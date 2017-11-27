import * as types from './actionTypes';

export function addChatFromData(data) {
  const chat = data.val();
  chat.key = data.key;
  return {
    type: types.ADD_CHAT,
    chat
  };
}

export function modifyChatFromData(data) {
  const chat = data.val();
  chat.key = data.key;
  return {
    type: types.MODIFY_CHAT,
    chat
  };
}

export function setActiveChat(chat) {
  return {
    type: types.SET_ACTIVE_CHAT,
    chat
  };
}

export function addMessageFromData(data) {
  const message = data.val();
  message.key = data.key;
  return {
    type: types.ADD_MESSAGE,
    message
  };
}

