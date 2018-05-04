import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { browserHistory } from "react-router";
import logger from 'redux-logger';

import middlewares from '../middlewares';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        ...middlewares,
        reduxImmutableStateInvariant(),
        routerMiddleware(browserHistory),
        logger,
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
