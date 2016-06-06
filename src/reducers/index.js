import {combineReducers} from 'redux';
import user from './userReducer';
import firebase from './firebaseReducer';
import auth from './authReducer';

import ajaxCallsInProgress from './ajaxStatusReducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  auth,
  firebase,
  ajaxCallsInProgress
});

export default rootReducer;
