import * as types from './actionTypes';
import firebaseApi from '../api/firebase';

export const postMessageRequest = message => {
    firebaseApi.databasePush('messages', message);
};

export const postMessageError = message => ({
    type: types.POST_MESSAGE_ERROR
});

export const postMessageSuccess = message => ({
    type: types.POST_MESSAGE_SUCCESS
});

export const getMessageSuccess = messages => ({
    type: types.GET_MESSAGE_SUCCESS,
    payload: messages
});

export const getMessageError = () => ({
    type: types.GET_MESSAGE_ERROR
});

export const getAllMessage = () => dispatch => dispatch({
    type: types.GET_ALL_MESSAGE
});