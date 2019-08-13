import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const MAX_MESSAGES = 10;

const chatReducer = (state = initialState.chat, action) => {
  switch (action.type) {
    case types.CHAT_CREATED_ROOM_SUCCESS:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.name]: { users: [], messages: [] }
        }
      };
    case types.CHAT_ENTERED_ROOM_SUCCESS:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.room]: {
            ...state.rooms[action.room],
            users: [...state.rooms[action.room].users, action.email]
          }
        }
      };
    case types.CHAT_LEFT_ROOM_SUCCESS: {
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.room]: {
            ...state.rooms[action.room],
            users: state.rooms[action.room].users.filter(
              email => email !== action.email
            )
          }
        }
      };
    }
    case types.CHAT_NEW_MESSAGE_ROOM_SUCCESS:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.room]: {
            ...state.rooms[action.room],
            messages: [
              ...state.rooms[action.room].messages.slice(
                state.rooms[action.room].messages.length < MAX_MESSAGES ? 0 : 1
              ),
              action.message
            ]
          }
        }
      };
    default:
      return state;
  }
};

export default chatReducer;
