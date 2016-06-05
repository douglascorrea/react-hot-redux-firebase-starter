import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import LoginPage from './components/login/LoginPage'; //eslint-disable-line import/no-named-as-default
import RegistrationPage from './components/registration/RegistrationPage'; //eslint-disable-line import/no-named-as-default


export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={HomePage} />
    <Route path="layout" component={Layout} />
    <Route path="about" component={AboutPage} />
    <Route path="register" component={RegistrationPage} />
    <Route path="login" component={LoginPage} />
  </Route>
);
