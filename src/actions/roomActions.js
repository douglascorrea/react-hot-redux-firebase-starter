import toastr from 'toastr';

import firebaseApi from '../api/firebase';
import * as types from './actionTypes';
import {push} from 'react-router-redux';

import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';

export function initRoom() {
    return (dispatch) => {

        dispatch(beginAjaxCall());
        dispatch(initRoomLoading());

        return firebaseApi.GetChildAddedOnce("/rooms")
            .then(room => {
                let U = [];
                for (let i in room) {
                    U.push(room[i]);
                }
                dispatch(getRoomSuccess(U));
            })
            .catch(error => {
                dispatch(beginAjaxCall());
                dispatch(getRoomError());
            });
    };
}

export function sendMessage(message, room) {

    return (dispatch) => {

        dispatch(beginAjaxCall());
        dispatch(messageSending());

        return firebaseApi.databasePushMessage("/rooms", message)
            .then(data => {
                message.messageUID = data;
                room.push(message);
                dispatch(sendMessageSuccess(room));
            })
            .catch(error => {
                dispatch(beginAjaxCall());
                dispatch(sendMessageError());
            });

    };

}

export function initRoomLoading() {
    return {
        type: types.INIT_ROOM_LOADING
    };
}

export function getRoomSuccess(room) {
    return {
        type : types.GET_ROOM_SUCCESS, room
    };
}

export function getRoomError() {
    return {
        type : types.GET_ROOM_ERROR
    };
}

export function messageSending() {
    return {
        type : types.MESSAGE_SENDING
    };
}

export function sendMessageSuccess(room) {
    return {
        type : types.SEND_MESSAGE_SUCCESS, room
    };
}

export function sendMessageError() {
    return {
        type : types.SEND_MESSAGE_ERROR
    };
}
