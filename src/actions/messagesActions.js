import * as types from './actionTypes';

export const pushMessagesSuccess = message => ({
  type: types.PUSH_MESSAGES_SUCCESS,
});

export const pushMessagesError = message => ({
  type: types.PUSH_MESSAGES_ERROR,
});

export const launchPushMessages = message => dispatch =>
  dispatch({
    type: types.LAUNCH_PUSH_MESSAGES,
    message,
  });

export const fetchMessagesSuccess = messages => ({
  type: types.FETCH_MESSAGES_SUCCESS,
  payload: messages,
});

export const fetchMessagesError = () => ({
  type: types.FETCH_MESSAGES_ERROR,
});


export const requestMessages = () => dispatch => dispatch({
  type: types.REQUEST,
});
