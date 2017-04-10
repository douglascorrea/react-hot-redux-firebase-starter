import firebaseApi from '../api/firebase';
import * as types from './actionTypes';
import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';
import {updateUser} from './userActions';

export function watchRooms() {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.WatchPathValue('/rooms', snapshot => {
      dispatch(fetchRoomsSuccess(snapshot.val() || {}));
    });
  };
}

export function watchCurrentRoom(roomId) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.WatchPathValue('/rooms/' + roomId, snapshot => {
      dispatch(fetchCurrentRoomSuccess(snapshot.val()));
    });
  };
}

export function fetchCurrentRoomSuccess(currentRoom) {
  return {
    type: types.ROOM_FETCH_CURRENT,
    payload: currentRoom
  };
}

export function createRoom(room) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.databasePush('/rooms', room).then(room => {
      dispatch(createRoomSuccess(room));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function createRoomSuccess(room) {
    return {
      type: types.ROOM_CREATED_SUCCESS,
      payload: room
    };
}

export function fetchRoomsSuccess(rooms) {
    return {
      type: types.ROOMS_FETCH_SUCCESS,
      payload: rooms
    };
}

export function watchRoomUsers(roomId) {
  const path = '/rooms/' + roomId + '/users';

  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.WatchPathValue(path, snapshot => {
      dispatch(fetchRoomUserSuccess(snapshot.val() || {}));
    });
  };
}

export function fetchRoomUserSuccess(roomUsers) {
    return {
      type: types.ROOM_FETCH_USERS,
      payload: roomUsers
    };
}

export function joinRoom(user, roomId) {
  const path = '/rooms/' + roomId + '/users/' + user.uid;

  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.databaseSet(path, user)
      .then(firebaseApi.databaseUpdate('/users/' + user.uid, {'currentRoom': roomId}))
      .then(() => {
        dispatch(updateUser({'currentRoom' : roomId}));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
    });
  };
}

export function leaveRoom(user, roomId) {
  const path = '/rooms/' + roomId + '/users/' + user.uid;

  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.databaseDelete(path)
      .then(firebaseApi.databaseUpdate('/users/' + user.uid, {'currentRoom': null}))
      .then(() => {
        dispatch(updateUser({'currentRoom' : null}));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
    });
  };
}
