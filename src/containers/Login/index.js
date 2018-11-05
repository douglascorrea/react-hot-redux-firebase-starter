import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import toastr from 'toastr';

import {
  signInWithEmailAndPassword,
} from '~/actions/authActions';

import H1 from '~/components/H1';
import LoginForm from '~/components/LoginForm';

import * as Ui from './Ui';

class Login extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({
      replace: PropTypes.func,
    }),
  }

  static propTypes = {
    actions: PropTypes.shape({
      signInWithEmailAndPassword: PropTypes.func.isRequired,
    }).isRequired,
    room: PropTypes.shape({
      rooms: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
      })).isRequired,
    }),
  }

  onPressLogin = (user) => {
    this.props.actions.signInWithEmailAndPassword(user)
    .then(this.handleSuccess)
    .catch(this.handleError);
  }

  onPressSignup = () => this.context.router.push('/signup');

  handleSuccess = user => {
    toastr.success('You are logged in');
    this.context.router.replace(`/room/${this.props.room.rooms[0].id}`);
  }

  handleError = error => toastr.error(error.message);

  render() {
    return (
      <Ui.Layout>
        <Ui.FormContainer>
          <LoginForm
            onPressLogin={this.onPressLogin}
            onPressSignup={this.onPressSignup}
          />
        </Ui.FormContainer>
      </Ui.Layout>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    room: state.room,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      signInWithEmailAndPassword,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
