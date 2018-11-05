import {createStore, applyMiddleware, compose} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';

import rootReducer from '~/reducers';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, reduxImmutableStateInvariant(), routerMiddleware(browserHistory)),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
