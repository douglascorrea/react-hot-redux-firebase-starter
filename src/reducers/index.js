import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import fbInitialized from './fbInitializedReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  fbInitialized,
  ajaxCallsInProgress
});

export default rootReducer;
