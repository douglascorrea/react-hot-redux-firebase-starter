import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router';

import routes from '~/routes';

class App extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.routes = routes(props.store);
  }

  render() {
    const { history } = this.props;
    return (
      <Router routes={this.routes} history={history} />
    );
  }
}

export default App;
