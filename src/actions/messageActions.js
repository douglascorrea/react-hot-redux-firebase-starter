import firebaseApi from '../api/firebase';
import * as types from './actionTypes';
import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';

export function watchMessages(roomId) {
  const LIMIT_NUMBER_MSG = 10;

  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.WatchPathValueLimitLast('/messages/' + roomId,LIMIT_NUMBER_MSG, snapshot => {
      dispatch(fetchMessagesSuccess(snapshot.val() || {}));
    });
  };
}

export function postMessage(message, roomId) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.databasePush('/messages/' + roomId, message).then(message => {
      dispatch(postMessageSuccess(message));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function postMessageSuccess(message) {
    return {
      type: types.MESSAGE_POST_SUCCESS,
      payload: message
    };
}

export function fetchMessagesSuccess(messages) {
    return {
      type: types.MESSAGES_FETCH_SUCCESS,
      payload: messages
    };
}
