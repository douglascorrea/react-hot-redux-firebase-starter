import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as firebaseActions from '../../actions/firebaseActions';
import RegistrationForm from './LoginForm';
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

    this.props.actions.signInWithEmailAndPassword(this.state.user)
      .then((user) => this.redirect(user))
      .catch(error => {
        toastr.error(error.message);
        this.setState({saving: false});
      });
  }

  redirect(user) {
    this.setState({saving: false});
    toastr.success('Usera Created');
    this.context.router.push('/courses');
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
    actions: bindActionCreators(firebaseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
