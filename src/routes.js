import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Layout from './components/Layout.react';
import HomePage from './components/home/HomePage.react';
import AdminPage from './components/admin/AdminPage.react';
import ProtectedPage from './components/protected/ProtectedPage.react';
import AboutPage from './components/about/AboutPage.react';
import LoginPage from './components/login/LoginPage.react'; //eslint-disable-line import/no-named-as-default
import RegistrationPage from './components/registration/RegistrationPage.react'; //eslint-disable-line import/no-named-as-default
import {requireAdmin} from './actions/authActions';


export default function Routes(store) {


  const checkAdmin = (nextState, replace, callback) => {
    store.dispatch(requireAdmin(nextState, replace, callback));
  };

  return (
    <Route path="/" component={Layout}>
      <IndexRoute component={HomePage}/>
      <Route path="layout" component={Layout}/>
      <Route path="about" component={AboutPage}/>
      <Route path="protected" component={ProtectedPage}/>
      <Route path="admin" component={AdminPage} onEnter={checkAdmin}/>
      <Route path="register" component={RegistrationPage}/>
      <Route path="login" component={LoginPage}/>
    </Route>
  );
}
