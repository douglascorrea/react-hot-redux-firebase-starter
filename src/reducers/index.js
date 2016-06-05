import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import user from './userReducer';
import fbInitialized from './fbInitializedReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  user,
  fbInitialized,
  ajaxCallsInProgress
});

export default rootReducer;
