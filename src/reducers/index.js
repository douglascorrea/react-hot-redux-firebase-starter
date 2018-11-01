import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './userReducer';
import routesPermissions from './routesPermissionsReducer';
import auth from './authReducer';
import room from './room';

import ajaxCallsInProgress from './ajaxStatusReducer';


const rootReducer = combineReducers({
  routing: routerReducer,
  routesPermissions,
  user,
  auth,
  room,
  ajaxCallsInProgress,
});

export default rootReducer;
