import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import toastr from 'toastr';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '~/actions/authActions';

import H1 from '~/components/H1';
import LoginForm from '~/components/LoginForm';

import * as Ui from './Ui';

class Home extends React.Component {
  static propTypes = {
    router: PropTypes.shape({
      replace: PropTypes.func,
    }),
    actions: PropTypes.shape({
      signInWithEmailAndPassword: PropTypes.func.isRequired,
      createUserWithEmailAndPassword: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    login: {},
    signup: {},
  }

  login = (user) => {
    this.props.actions.signInWithEmailAndPassword(user)
    .then(user => {
      toastr.success('You are logged in');
      this.props.router.replace('/room');
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        this.props.actions.createUserWithEmailAndPassword(user)
        .then(() => this.login(user))
        .catch((e) => toastr.error(e.message));
      } else toastr.error(error.message);
    });
  }

  render() {
    return (
      <Ui.Layout>
        <Ui.FormContainer>
          <LoginForm
            login={this.login}
          />
        </Ui.FormContainer>
      </Ui.Layout>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      signInWithEmailAndPassword,
      createUserWithEmailAndPassword,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
