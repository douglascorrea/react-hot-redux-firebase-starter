import React, { Component } from 'react';
import {Router} from 'react-router';
import routes from '../routes';

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

class App extends Component {
  render() {
    const { history, store } = this.props;
    return (
      <Router routes={routes(store)} history={history} />
    );
  }
}

App.propTypes = {
  history: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired
};

export default App;
