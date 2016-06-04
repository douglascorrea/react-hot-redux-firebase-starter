import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import Counter from './components/counter/Counter';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';


export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={HomePage} />
    <Route path="layout" component={Layout} />
    <Route path="counter" component={Counter} />
    <Route path="about" component={AboutPage} />
  </Route>
);
