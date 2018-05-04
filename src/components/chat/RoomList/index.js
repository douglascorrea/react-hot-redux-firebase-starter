import React, { PropTypes } from 'react';

import Room from './Room';


const RoomList = ({ rooms, onRoomRemove }) => (
  <span>
    <h4>Rooms</h4>
    <div className="chatx-roomlist">
      {
        rooms.map(({ name, id }) => (
          <Room
            key={id}
            onRemove={() => onRoomRemove(id)}
          >
            {name}
          </Room>
        ))
      }
    </div>
  </span>
);
RoomList.propTypes = {
  onRoomRemove: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default RoomList;
