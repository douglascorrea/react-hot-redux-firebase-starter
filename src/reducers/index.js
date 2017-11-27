import {combineReducers} from 'redux';
import user from './userReducer';
import routesPermissions from './routesPermissionsReducer';
import auth from './authReducer';
import chat from './chatReducer';

import ajaxCallsInProgress from './ajaxStatusReducer';
import {routerReducer} from 'react-router-redux';


const rootReducer = combineReducers({
  routing: routerReducer,
  routesPermissions,
  user,
  auth,
  ajaxCallsInProgress,
  chat
});

export default rootReducer;
