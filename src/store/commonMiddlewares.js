import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from "react-router";

import sagaMiddleware from '../sagas/middleware';

export default [
  thunk,
  routerMiddleware(hashHistory),
  sagaMiddleware,
];
