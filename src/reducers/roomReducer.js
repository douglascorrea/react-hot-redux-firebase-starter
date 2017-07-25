import * as types from '../actions/actionTypes';
import initialState from './initialState';

//- Reducer message input
export default function roomReducer(state = initialState.room, action) {
  switch (action.type) {
    case types.INIT_ROOM_LOADING:
        return Object.assign({}, state, action.room);
    case types.GET_ROOM_SUCCESS:
        return Object.assign({}, state, {
            messageContainer : action.room
        });
    case types.GET_ROOM_ERROR:
        return state;
    case types.MESSAGE_SENDING:
        return Object.assign({}, state, action.room);
    case types.SEND_MESSAGE_SUCCESS:
        return Object.assign({}, state, state.room.messageContainer = action.room);
    case types.SEND_MESSAGE_ERROR:
        return state;
    default:
      return state;
  }
}
