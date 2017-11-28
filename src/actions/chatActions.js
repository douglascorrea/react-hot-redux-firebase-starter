import * as types from './actionTypes';
import ChatRoomApi from '../api/chatRoom';
import MessageApi from '../api/message';

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

export function leaveChat(chat) {
  ChatRoomApi.leave(chat);
  return {
    type: types.LEAVE_CHAT,
    chat
  };
}

export function joinChat(chat) {
  ChatRoomApi.join(chat);
  return {
    type: types.JOIN_CHAT,
    chat
  };
}

export function createMessage(text, chatKey) {
  MessageApi.create(text, chatKey);
  return {
    type: types.CREATE_MESSAGE
  };
}

