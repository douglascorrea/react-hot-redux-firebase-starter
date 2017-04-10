import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';

const CreateMessageForm = ({message, onSave, onChange, saving}) => {
  return (
    <form>
      <h2>Create Message</h2>
      <TextInput
        name="value"
        label="New message text"
        onChange={onChange}
        value={message.value}
        />

      <input
        type="submit"
        disabled={saving || message.value <= 0}
        value={saving ? 'Posting Message ...' : 'Post Message'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

CreateMessageForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  message: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CreateMessageForm;
