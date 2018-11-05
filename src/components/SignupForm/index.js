import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '~/components/TextInput';
import Button from '~/components/Button';
import H1 from '~/components/H1';
import P from '~/components/P';

import * as Ui from './Ui';

export default class SignupForm extends React.PureComponent {
  static propTypes = {
    login: PropTypes.func,
  }

  static defaultProps = {
    login: () => 0,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.inputHandler = {
      email: this.inputHandleGenerator('email'),
      password: this.inputHandleGenerator('password'),
      displayName: this.inputHandleGenerator('displayName'),
    };
  }

  inputHandleGenerator = (key) => {
    this.state[key] = '';
    return (value) => this.setState({
      [key]: value,
    });
  }

  onPressSignup = () => this.props.onPressSignup(this.state);

  render() {
    return (
      <Ui.Container>
        <Ui.Header>
          <H1>Signup</H1>
        </Ui.Header>
        <Ui.Line>
          <TextInput
            key="displayName"
            type="displayName"
            placeholder="Enter your display name"
            value={this.state.displayName}
            onChangeText={this.inputHandler.displayName}
          />
        </Ui.Line>
        <Ui.Line>
          <TextInput
            key="email"
            type="email"
            placeholder="Enter your email"
            value={this.state.email}
            onChangeText={this.inputHandler.email}
          />
        </Ui.Line>
        <Ui.Line>
          <TextInput
            key="password"
            type="password"
            placeholder="Enter your password"
            secureTextEntry
            value={this.state.password}
            onSubmitEditing={this.onPressSignup}
            onChangeText={this.inputHandler.password}
          />
          </Ui.Line>
          <Ui.Footer>
            <Ui.FormButton onPress={this.props.onPressLogin}>
              <P>Login</P>
            </Ui.FormButton>
            <Ui.FormButton onPress={this.onPressSignup}>
              <P>Signup</P>
            </Ui.FormButton>
          </Ui.Footer>
        </Ui.Container>
    );
  }
}
