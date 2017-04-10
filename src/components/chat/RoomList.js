import React, {PropTypes} from 'react';
import RoomListItem from './RoomListItem';

const RoomList = ({rooms}) => {
  return (
    <div>
      <h3>Rooms</h3>
      <div className="room-list">
        {rooms.map((room, index) =>
          <RoomListItem
            key={index}
            name={room.name}
            objectId={room.objectId}
          />
        )}
      </div>
    </div>
  );
};

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default RoomList;
