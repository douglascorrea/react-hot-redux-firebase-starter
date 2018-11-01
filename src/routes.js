import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

import E404 from '~/components/E404';
import Home from '~/containers/Home';
import Room from '~/containers/Room';
import Layout from '~/components/Layout';

import {
  requireAdmin,
} from '~/actions/authActions';

export default function Routes(store) {
  const redirectToRoom = (nextState, replace, callback) => {
    if (store.getState().auth.isLogged) {
      replace('/room');
    }
    callback();
  };

  return (
    <Route
      path="/"
      component={Layout}
    >
      <IndexRoute
        component={Home}
        onEnter={redirectToRoom}
      />
      <Route
        path="room"
        component={Room}
      />
      <Route path="/404" component={E404} />
      <Redirect from="*" to="/404" />
    </Route>
  );
}
