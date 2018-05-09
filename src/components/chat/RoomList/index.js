import React, { PropTypes } from 'react';

import connector from './connector';
import Room from './Room';


export const RoomList = ({ rooms, onRoomSelect, onRoomRemove, currentRoom }) => (
  <span>
    <h4>Rooms</h4>
    <div className="chatx-roomlist">
      {
        rooms.map((room) => (
          <Room
            {...room}
            isSelected={room.id === currentRoom.id}
            key={room.id}
            onSelect={() => onRoomSelect(room.id)}
            onRemove={() => onRoomRemove(room.id)}
          >
            {room.name}
          </Room>
        ))
      }
    </div>
  </span>
);
RoomList.propTypes = {
  onRoomSelect: PropTypes.func.isRequired,
  onRoomRemove: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  currentRoom: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default connector(RoomList);
