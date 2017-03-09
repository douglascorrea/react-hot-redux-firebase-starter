import chatApi from '../api/chat';
import * as actions from './actionTypes';
import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';

const handleError = dispatch => error => {
  console.error(error);
  dispatch(ajaxCallError(error));
  throw(error);
};

export function getChatRooms() {
  return (dispatch) => {
    dispatch(beginAjaxCall());

    return chatApi
      .fetchChatRooms()
      .then(chatrooms => {
        dispatch(chatroomsLoadedSuccess(chatrooms))
      })
      .catch(handleError(dispatch));
  }
}

export function createChatRoom(name) {
  return (dispatch) => {
    dispatch(beginAjaxCall());

    return chatApi
      .createChatRoom(name)
      .then(() => dispatch(chatroomCreatedSuccess()))
      .catch(handleError(dispatch));
  };
}

export function sendMessageToRoom(chatRoomId, msg) {

  return (dispatch) => {
    dispatch(beginAjaxCall());

    return chatApi.sendMessageToChatRoomById(chatRoomId, msg)
      .then(() => dispatch(messageSentSuccess()))
      .catch(handleError(dispatch));
  }
}

export function connectChatRoom(name) {
  return (dispatch) => {
    dispatch(beginAjaxCall());

    return chatApi
      .connectChatRoom(name)
      .then(res => {
        dispatch(chatroomLoadedSuccess(res));
        return res;
      })
      .then(res => {
        return Promise.resolve(chatApi.streamMessages(res.id))
          .then(value => {
            value.on('child_added', data => {
              dispatch(chatroomNewMessage({...data.val()}));
            });
            return value;
          })
      });
  }
}

export function chatroomCreatedSuccess() {
  return {
    type: actions.CHAT_CREATE_ROOM_SUCCESS
  };
}

export function chatroomsLoadedSuccess(chatrooms) {
  return {
    type: actions.CHATROOMS_LOAD_SUCCESS,
    chatrooms
  };
}

export function chatroomLoadedSuccess(chatroom, messagesRef) {
  return {
    type: actions.CHATROOM_LOAD_SUCCESS,
    chatroom,
    messagesRef
  };
}

export function messageSentSuccess() {
  return {
    type: actions.CHAT_SEND_MESSAGE_SUCCESS
  };
}

export function chatroomNewMessage(message) {
  return {
    type: actions.CHATROOM_NEW_MESSAGE,
    message
  }
}
