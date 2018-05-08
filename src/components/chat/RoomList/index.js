import React, { PropTypes } from 'react';

import connector from './connector';
import Room from './Room';


export const RoomList = ({ rooms, onRoomSelect, onRoomRemove, currentRoom }) => (
  <span>
    <h4>Rooms</h4>
    <div className="chatx-roomlist">
      {
        rooms.map(({ name, id }) => (
          <Room
            isSelected={id === currentRoom.id}
            key={id}
            onSelect={() => onRoomSelect(id)}
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
