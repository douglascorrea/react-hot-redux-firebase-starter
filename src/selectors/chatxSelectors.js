import { createSelector } from 'reselect';
import { pipe, values, path, sortBy, prop } from 'ramda';

export const getIsEnabled = path(['chatx', 'enabled']);

export const getCurrentRoom = createSelector(
  path(['chatx', 'rooms']),
  path(['chatx', 'currentRoom']),
  (rooms, roomId) => rooms[roomId] || {},
);

export const getRooms = createSelector(
  path(['chatx', 'rooms']),
  pipe(
    values,
    sortBy(prop('createdAt'))
  ),
);
