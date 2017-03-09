import React from 'react';
import TextInput from '../common/TextInput';
import {Button} from 'react-bootstrap';

const RegistrationForm = ({user, onSave, onChange, saving}) => {
  return (
    <form>
      <h1>Create account</h1>
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
        type="submit"
        disabled={saving}
        onClick={onSave}>
        {saving ? 'Signing up...' : 'Sign Up'}
      </Button>
    </form>
  );
};

RegistrationForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  user: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default RegistrationForm;
