import {combineReducers} from 'redux';
import user from './userReducer';
import routesPermissions from './routesPermissionsReducer';
import auth from './authReducer';
import {roomsReducer as rooms, roomUsers, currentRoom} from './roomsReducer';
import messages from './messagesReducer';

import ajaxCallsInProgress from './ajaxStatusReducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
  routing: routerReducer,
  routesPermissions,
  user,
  auth,
  ajaxCallsInProgress,
  rooms,
  roomUsers,
  currentRoom,
  messages
});

export default rootReducer;
