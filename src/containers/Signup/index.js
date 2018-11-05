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
import SignupForm from '~/components/SignupForm';

import * as Ui from './Ui';

class Signup extends React.PureComponent {
  static contextTypes = {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
    }).isRequired,
  }

  static propTypes = {
    actions: PropTypes.shape({
      signInWithEmailAndPassword: PropTypes.func.isRequired,
      createUserWithEmailAndPassword: PropTypes.func.isRequired,
    }).isRequired,
    room: PropTypes.shape({
      rooms: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
      })).isRequired,
    }),
  }

  onPressLogin = () => this.context.router.push('/login');

  onPressSignup = (user) => {
    this.props.actions.createUserWithEmailAndPassword(user)
    .then(() => this.props.actions.signInWithEmailAndPassword(user))
    .then(() => this.context.router.replace(`/room/${this.props.room.rooms[0].id}`))
    .catch((e) => toastr.error(e.message));
  }

  render() {
    return (
      <Ui.Layout>
        <Ui.FormContainer>
          <SignupForm
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
      createUserWithEmailAndPassword,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
