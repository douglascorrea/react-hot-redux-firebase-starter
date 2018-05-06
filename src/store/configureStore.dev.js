import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
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
        logger,
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
