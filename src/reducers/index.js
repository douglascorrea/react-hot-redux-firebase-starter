import { combineReducers } from 'redux';
import user from './userReducer';
import auth from './authReducer';
import chatx from './chatxReducer';

import ajaxCallsInProgress from './ajaxStatusReducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  auth,
  chatx,
  ajaxCallsInProgress,
});

export default rootReducer;
