import React, { PropTypes } from 'react';

const RoomCreator = ({ onCreate }) => {
  const onSubmitForm = (e) => {
    e.preventDefault();
    const input = e.target.firstChild;
    const roomName = input.value.trim().toLowerCase();
    if (roomName) {
      onCreate(roomName);
      input.value = '';
    }
  };
  return (
    <span>
      <h4>Create a room</h4>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          placeholder="Room name"
        />
      </form>
    </span>
  );
};
RoomCreator.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default RoomCreator;
