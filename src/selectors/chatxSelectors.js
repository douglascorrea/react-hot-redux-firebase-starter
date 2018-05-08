import { createSelector } from 'reselect';
import {
  pipe, values, has, prop, propOr, path, sortBy, applyTo,
  keys, filter, compose, contains, map, over, lensProp,
} from 'ramda';

import { getCurrentUserUID } from './authSelectors';

const getProp = key => (state, ownProps = {}) => ownProps[key];

export const getCurrentRoom = createSelector(
  path(['chatx', 'rooms']),
  path(['chatx', 'currentRoom']),
  (rooms, roomId) => rooms[roomId] || {}
);

const overAuthor = over(lensProp('author'));
export const getCurrentMessages = createSelector(
  path(['chatx', 'users']),
  getCurrentRoom,
  (users, room) => applyTo(room)(pipe(
    propOr({}, 'messages'),
    values,
    sortBy(prop('createdAt')),
    map(overAuthor(id => users[id])),
  ))
);

export const getCurrentRoomId = createSelector(
  getCurrentRoom,
  prop('id')
);

export const getCurrentRoomName = createSelector(
  getCurrentRoom,
  prop('name')
);

export const getCurrentRoomUserMessage = createSelector(
  getCurrentRoom,
  prop('userMessage')
);

export const getCurrentRoomUsers = createSelector(
  path(['chatx', 'users']),
  path(['chatx', 'joinedRooms']),
  path(['chatx', 'currentRoom']),
  (users, joinedRooms, currentRoom) => (
    keys(joinedRooms[currentRoom]).map(userId => users[userId])
  )
);

export const getRooms = createSelector(
  path(['chatx', 'rooms']),
  pipe(
    values,
    sortBy(prop('createdAt'))
  )
);

export const getFirstRoom = createSelector(
  getRooms,
  prop(0)
);

export const getUserJoinedRooms = createSelector(
  path(['chatx', 'joinedRooms']),
  getCurrentUserUID,
  (joinedRooms, uuid) => compose(
    keys,
    filter(has(uuid)),
  )(joinedRooms)
);

export const getRoomIsJoined = createSelector(
  getProp('roomId'),
  getUserJoinedRooms,
  (roomId, joinedRooms) => contains(roomId, joinedRooms)
);

export const getCurrentRoomIsJoined = (state, ownProps = {}) => {
  const roomId = getCurrentRoomId(state, ownProps);
  return getRoomIsJoined(state, { ...ownProps, roomId });
};
