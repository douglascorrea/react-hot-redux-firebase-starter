import { combineReducers } from 'redux';

import users from './users';
import rooms from './rooms';
import currentRoom from './currentRoom';
import joinedRooms from './joinedRooms';

export default combineReducers({
  users,
  rooms,
  currentRoom,
  joinedRooms,
});
