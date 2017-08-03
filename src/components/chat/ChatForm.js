import React from 'react';
import TextInput from '../common/TextInput';

const ChatForm = ({chatRoom, onSave, onChange, saving}) => {
  return (
    <div>
      <form>
        <h3>Create a Chatroom</h3>
        <TextInput
          name="name"
          label="Name"
          onChange={onChange}
          placeholder="Enter a name for your chatroom (ex: Almight Alpaca)"
          value={chatRoom.name}
          />

        <input
          type="submit"
          disabled={saving}
          value={saving ? 'Creating...' : 'Create'}
          className="btn btn-primary"
          onClick={onSave}/>
      </form>
    </div>
  );
};

ChatForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  chatRoom: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired
};

export default ChatForm;
