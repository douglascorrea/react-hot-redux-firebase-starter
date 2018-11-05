import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

import Layout from '~/containers/Layout';
import Signup from '~/containers/Signup';
import Login from '~/containers/Login';
import Room from '~/containers/Room';
import E404 from '~/components/E404';

import {
  authLoggedIn,
} from '~/actions/authActions';

export default function Routes(store) {
  const defaultRedirect = (nextState, replace, callback) => {
    const state = store.getState();
    const { isLogged } = state.auth;
    const { pathname } = nextState.location;
    const { requireAnonymous } = state.routesPermissions;
    if (isLogged && (requireAnonymous.includes(pathname)
      || pathname === '/')) {
      replace(`/room/${state.room.rooms[0].id}`);
    }
    if (!isLogged && (!requireAnonymous.includes(pathname)
      || pathname === '/')) {
      replace('/login');
    }
    callback();
  };

  const isLoggedIn = (nextState, replace, callback) => {
    store.dispatch(authLoggedIn(store.getState().auth.currentUserUID))
    .then(() => callback());
  };

  return (
    <Route
      path="/"
      component={Layout}
      onEnter={defaultRedirect}
    >
      <Route
        path="/login"
        component={Login}
      />
      <Route
        path="/signup"
        component={Signup}
      />
      <Route
        component={Room}
        path="/room/:roomId"
        onEnter={isLoggedIn}
      />
    </Route>
  );
}
