import {combineReducers} from 'redux';
import user from './userReducer';
import routesPermissions from './routesPermissionsReducer';
import auth from './authReducer';
import room from './roomReducer';

import ajaxCallsInProgress from './ajaxStatusReducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
  routing: routerReducer,
  routesPermissions,
  user,
  auth,
  room,
  ajaxCallsInProgress
});

export default rootReducer;
