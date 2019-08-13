import { combineReducers } from 'redux';
import user from './userReducer';
import routesPermissions from './routesPermissionsReducer';
import chat from './chatReducer';
import auth from './authReducer';

import ajaxCallsInProgress from './ajaxStatusReducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
  routing: routerReducer,
  routesPermissions,
  user,
  auth,
  chat,
  ajaxCallsInProgress
});

export default rootReducer;
