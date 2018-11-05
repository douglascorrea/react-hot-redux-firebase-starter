import * as types from './actionTypes';
import {
  ajaxCallError,
  beginAjaxCall,
} from './ajaxStatusActions';

export function onLoadedRooms(payload) {
  return {
    type: types.ROOM_ON_LOADED,
    payload,
  };
}

export function setCurrentRoom(roomId) {
  return {
    type: types.ROOM_SET_CURRENT,
    payload: roomId,
  };
}

export function onLoadedUsers(payload) {
  return {
    type: types.ROOM_ON_LOADED_USERS,
    payload,
  };
}


export function enterRoomSuccess(payload) {
  return {
    type: types.ROOM_ENTER_SUCCESS,
    payload,
  };
}
