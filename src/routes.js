import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Layout from './components/Layout';
import Counter from './components/Counter';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Layout} />
    <Route path="counter" component={Counter} />
  </Route>
);
