import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';

export default function (ComposedComponent) {
  class Authentication extends React.Component {
    static contextTypes = {
      router : PropTypes.object,
    }

    static propTypes = {
      authenticated : PropTypes.bool,
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/login');
        toastr.error('You need to be logged to access this page');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/login');
        toastr.error('You need to be logged to access this page');
      }
    }

    render() {
      return <ComposedComponent {...this.props}/>;
    }
  }

  const mapStateToProps = (state) => ({
    authenticated : state.auth.isLogged,
  });
  return connect(mapStateToProps)(Authentication);
}
