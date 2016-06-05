import {combineReducers} from 'redux';
import user from './userReducer';
import fbInitialized from './fbInitializedReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  user,
  fbInitialized,
  ajaxCallsInProgress
});

export default rootReducer;
