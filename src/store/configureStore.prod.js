import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers';
import middlewares from '../middlewares';
import runSagas from '../sagas';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
  runSagas();
  return store;
}
