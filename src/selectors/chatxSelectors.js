import { createSelector } from 'reselect';
import {
  pipe, values, path, sortBy, prop, has,
  keys, filter, compose,
} from 'ramda';

import { getCurrentUserUID } from './authSelectors';

export const getIsEnabled = path(['chatx', 'enabled']);

export const getCurrentRoom = createSelector(
  path(['chatx', 'rooms']),
  path(['chatx', 'currentRoom']),
  (rooms, roomId) => rooms[roomId] || {}
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
