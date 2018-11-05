import * as types from '~/actions/actionTypes';

import initialState from './initialState';

const mergeArrayWithUniqId = (currentArray, newArray, reverse = false) => {
  const ids = currentArray.map(({ id }) => id);
  const filteredArray = newArray.filter(({ id }) =>
    !ids.includes(id),
  );
  if (reverse) {
    return [
      ...filteredArray,
      ...currentArray,
    ];
  }
  return [
    ...currentArray,
    ...filteredArray,
  ];
};

export default function authReducer(state = initialState.room, action) {
  const { payload, type } = action;
  switch (type) {
    case types.MESSAGE_ON_LOADED: {
      const newData = payload.data.reverse();
      return Object.assign({}, state, {
        messages: payload.isFirstTime ?
          newData
        : mergeArrayWithUniqId(
          state.messages,
          newData,
          true,
        ),
      });
    }
    case types.ROOM_ON_LOADED_USERS: {
      return Object.assign({}, state, {
        users: payload.data,
      });
    }
    case types.ROOM_ON_LOADED: {
      return Object.assign({}, state, {
        rooms: mergeArrayWithUniqId(
          state.rooms,
          action.payload,
        ),
      });
    }
    case types.ROOM_SET_CURRENT: {
      return Object.assign({}, state, {
        rooms: state.rooms.map((room) => {
          if (room.id === payload) {
            return {
              ...room,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            };
          }
          return {
            ...room,
            backgroundColor: 'white',
          };
        }),
      });
    }
    default:
      return state;
  }
}
