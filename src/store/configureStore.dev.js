import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import logger from 'redux-logger';

import rootReducer from '../reducers';
import middlewares from '../middlewares';
import runSagas from '../sagas';


export default function configureStore(initialState) {
  const store = createStore(
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
  runSagas();
  return store;
}
