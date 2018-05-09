import { createStore, applyMiddleware } from 'redux';

import commonMiddewares from './commonMiddlewares';
import rootReducer from '../reducers';
import runSagas from '../sagas';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...commonMiddewares)
  );
  runSagas();
  return store;
}
