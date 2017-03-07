import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from '../../actions/authActions';
import RegistrationForm from './RegistrationForm';
import toastr from 'toastr';

export class RegistrationPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        email: "",
        password: ""
      },
      saving: false
    };

    this.updateUserState = this.updateUserState.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  updateUserState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  createUser(event) {
    event.preventDefault();

    this.setState({saving: true});

    this.props.actions.createUserWithEmailAndPassword(this.state.user)
      .then(() => {
        toastr.success('User Created');
        // Sign in directly after creating the account
        this.props.actions.signInWithEmailAndPassword(this.state.user)
          .then(() => {
            toastr.success('Logged in');
            this.context.router.push('/');
          })
          .catch(error => {
            toastr.error(error.message);
            this.setState({saving: false});
          });
      })
      .catch(error => {
        toastr.error(error.message);
        this.setState({saving: false});
      });
  }

  render() {
    return (
      <RegistrationForm
        onChange={this.updateUserState}
        onSave={this.createUser}
        saving={this.state.saving}
        user={this.state.user}
      />
    );
  }
}

RegistrationPage.propTypes = {
  actions: PropTypes.object.isRequired
};

RegistrationPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({createUserWithEmailAndPassword, signInWithEmailAndPassword}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
