import React from 'react';
import TextInput from '../common/TextInput';

const RoomForm = ({value, onChange}) => {
  return (
    <form>
      <TextInput
        type="text"
        value={value}
        name="message"
        onChange={onChange}/>
    </form>
  );
};

RoomForm.propTypes = {
  value: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default RoomForm;
