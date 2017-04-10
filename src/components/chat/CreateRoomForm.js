import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';

const CreateRoomForm = ({room, onSave, onChange, saving}) => {
  return (
    <form>
      <h3>Create Room</h3>
      <TextInput
        name="name"
        label="Room name"
        onChange={onChange}
        value={room.name}
        />

      <input
        type="submit"
        disabled={saving || room.name <= 0}
        value={saving ? 'Creating Room ...' : 'Create Room'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

CreateRoomForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  room: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CreateRoomForm;
