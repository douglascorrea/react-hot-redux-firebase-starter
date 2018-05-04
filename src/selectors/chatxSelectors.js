import { pipe, values, path, sortBy, prop } from 'ramda';

export const getIsEnabled = path(['chatx', 'enabled']);
export const getRooms = pipe(
  path(['chatx', 'rooms']),
  values,
  sortBy(prop('createdAt'))
);
