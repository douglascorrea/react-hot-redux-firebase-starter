import {combineReducers} from 'redux';
import user from './userReducer';
import routesPermissions from './routesPermissionsReducer';
import auth from './authReducer';

import ajaxCallsInProgress from './ajaxStatusReducer';
import channel from './channelReducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
  routing: routerReducer,
  routesPermissions,
  user,
  auth,
  ajaxCallsInProgress,
  channel
});

export default rootReducer;
