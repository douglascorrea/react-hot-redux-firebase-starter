import React from 'react';
import TextInput from '../common/TextInput';
import {Button} from 'react-materialize';

const LoginForm = ({user, onSave, onChange, saving}) => {
  return (
    <form>
      <h1>Login</h1>
      <TextInput
        name="email"
        label="Email"
        onChange={onChange}
        value={user.email}
        type="text"/>

      <TextInput
        name="password"
        label="Password"
        onChange={onChange}
        value={user.password}
        type="password"/>
      <Button
        waves='light'
        type="submit"
        disabled={saving}
        onClick={onSave}>
        {saving ? 'Logining in...' : 'Login'}
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  user: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default LoginForm;
