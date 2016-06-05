import {combineReducers} from 'redux';
import user from './userReducer';
import fbInitialized from './fbInitializedReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  fbInitialized,
  ajaxCallsInProgress
});

export default rootReducer;
