import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '~/components/TextInput';
import Button from '~/components/Button';
import H1 from '~/components/H1';
import P from '~/components/P';

import * as Ui from './Ui';

export default class LoginForm extends React.PureComponent {
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
    };
  }

  inputHandleGenerator = (key) => {
    this.state[key] = '';
    return (value) => this.setState({
      [key]: value,
    });
  }

  onPressLogin = () => this.props.onPressLogin(this.state);

  render() {
    return (
      <Ui.Container>
        <Ui.Header>
          <H1>Login</H1>
        </Ui.Header>
        <Ui.Line>
          <TextInput
            key="email"
            type="email"
            placeholder="Email"
            value={this.state.email}
            onChangeText={this.inputHandler.email}
          />
        </Ui.Line>
        <Ui.Line>
          <TextInput
            key="password"
            type="password"
            placeholder="Password"
            secureTextEntry
            value={this.state.password}
            onSubmitEditing={this.onPressLogin}
            onChangeText={this.inputHandler.password}
          />
          </Ui.Line>
          <Ui.Footer>
            <Ui.FormButton onPress={this.props.onPressSignup}>
              <P>Signup</P>
            </Ui.FormButton>
            <Ui.FormButton onPress={this.onPressLogin}>
              <P>Login</P>
            </Ui.FormButton>
          </Ui.Footer>
        </Ui.Container>
    );
  }
}
