import React from 'react';
import TextInput from '../common/TextInput';

const ChatMessageForm = ({message, onSave, onChange}) => {
  return (
    <div>
      <form>
        <TextInput
          name="body"
          onChange={onChange}
          placeholder="Say something nice !"
          />

        <input
          type="submit"
          className="btn btn-primary"
          onClick={onSave}/>
      </form>
    </div>
  );
};

ChatMessageForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  message: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired
};

export default ChatMessageForm;
