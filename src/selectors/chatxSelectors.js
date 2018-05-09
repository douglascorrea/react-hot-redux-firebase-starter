import { createSelector } from 'reselect';
import {
  pipe, values, has, prop, propOr, path, sortBy, applyTo, assoc,
  keys, filter, compose, contains, map, over, lensProp, propEq,
} from 'ramda';

import { getUserIsAdmin } from './userSelectors';
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
    keys(joinedRooms[currentRoom])
      .map(userId => users[userId])
      .filter(user => !!user)
    )
);

const getOwnedRooms = createSelector(
  path(['chatx', 'rooms']),
  getCurrentUserUID,
  (rooms, userId) => filter(propEq('author', userId), values(rooms))
);

const getOwnedRoomsIds = createSelector(
  getOwnedRooms,
  map(prop('id'))
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

export const getRooms = createSelector(
  path(['chatx', 'rooms']),
  getUserIsAdmin,
  getOwnedRoomsIds,
  getUserJoinedRooms,
  (rooms, isAdmin, ownedRoomsIds, joinedRooms) => applyTo(rooms)(pipe(
    values,
    sortBy(prop('createdAt')),
    map(room => {
      const canRemove = isAdmin || contains(room.id, ownedRoomsIds);
      const isJoined = contains(room.id, joinedRooms);
      return applyTo(room, pipe(
        assoc('canRemove', canRemove),
        assoc('isJoined', isJoined),
      ));
    })
  ))
);

export const getFirstRoom = createSelector(
  getRooms,
  prop(0)
);
