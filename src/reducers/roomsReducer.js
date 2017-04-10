import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function roomsReducer(state = initialState.rooms, action) {
  switch (action.type) {
    case types.ROOMS_FETCH_SUCCESS:
      return Object.keys(action.payload).map((key) => {
        let room = action.payload[key];
        room['objectId'] = key;
        return room;
      });
    default:
      return state;
  }
}

export function roomUsers(state = [], action){
  switch (action.type) {
    case types.ROOM_FETCH_USERS:
      return Object.keys(action.payload).map(key => action.payload[key]);
    default:
      return state;
  }
}

export function currentRoom(state = {}, action) {
  let users = [];
  switch (action.type) {
    case types.ROOM_FETCH_CURRENT:
      if (action.payload.users) {
        users = Object.keys(action.payload.users).map(key => action.payload.users[key]);
      }
      return Object.assign({}, action.payload, {users: users});
    default:
      return state;
  }
}
