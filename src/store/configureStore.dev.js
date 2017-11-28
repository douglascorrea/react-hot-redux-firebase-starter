import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';

const configureStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(
          thunk,
          reduxImmutableStateInvariant(),
          routerMiddleware(browserHistory),
          sagaMiddleware
        ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    ),
    runSaga: sagaMiddleware.run(rootSaga),
  };
};

export default configureStore;
