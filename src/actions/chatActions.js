import toastr from 'toastr';

import firebaseApi from '../api/firebase';
import * as types from './actionTypes';
import {push} from 'react-router-redux';

import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';

export function chatCreatedSuccess() {
  return {
    type: types.CHATROOM_CREATED_SUCCESS
  };
}

export function chatJoinedSuccess() {
  return {
    type: types.CHATROOM_JOINED_SUCCESS
  };
}

export function chatLeftSuccess() {
  return {
    type: types.CHATROOM_LEFT_SUCCESS
  };
}

export function updateUsers(users) {
    return {
        type: types.UPDATE_USERS,
        data: {
            users
        }
    };
}

export function updateMessages(messages) {
    return {
        type: types.UPDATE_MESSAGES,
        data: {
            messages
        }
    };
}

export function updateChatrooms(chatrooms) {
    return {
        type: types.UPDATE_CHATROOMS,
        data: {
            chatrooms
        }
    };
}

export function joinChatRoom(chatId, user) {
  return (dispatch) => {
    firebaseApi.databaseSet('/chatrooms/' + chatId + '/users/' + user.uid, user.email)
      .then(
        () => {
          dispatch(chatJoinedSuccess());
        })
      .catch(
        error => {
          dispatch(ajaxCallError(error));
          // @TODO better error handling
          throw(error);
        });
  };
}

export function leaveChatRoom(chatId, userId) {
  return (dispatch) => {
    firebaseApi.databaseRemove('/chatrooms/' + chatId + '/users/' + userId)
      .then(
        () => {
          dispatch(chatLeftSuccess());
        })
      .catch(
        error => {
          dispatch(ajaxCallError(error));
          // @TODO better error handling
          throw(error);
        });
  };
}

export function createChat(chat) {
  return (dispatch) => {
    firebaseApi.databaseSet('/chatrooms/' + chat.uid, chat)
      .then(
        () => {
          dispatch(chatCreatedSuccess());
        })
      .catch(
        error => {
          dispatch(ajaxCallError(error));
          // @TODO better error handling
          throw(error);
        });
  };
}

export function createMessage(chatroom, message) {
  return (dispatch) => {
    firebaseApi.databaseSet('/chatrooms/'+chatroom+'/messages/' + message.uid, message)
      .then(
        () => {
          dispatch(chatCreatedSuccess());
        })
      .catch(
        error => {
          dispatch(ajaxCallError(error));
          // @TODO better error handling
          throw(error);
        });
  };
}
