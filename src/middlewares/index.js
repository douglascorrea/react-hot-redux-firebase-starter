import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from "react-router";

import sagaMiddleware from '../sagas/middleware';

import createChatxMiddleware from './chatx';
import firebaseApi from '../api/firebase';

export default [
  thunk,
  createChatxMiddleware(firebaseApi),
  routerMiddleware(hashHistory),
  sagaMiddleware,
];
