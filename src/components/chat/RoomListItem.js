import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const RoomListItem = ({name, objectId, onClick}) => {
  return (
    <Link to={`/chat/${objectId}`} className="room-list-item">
      <span className="room-list-item-name">{name}</span>
    </Link>
  );
};

RoomListItem.propTypes = {
  name: PropTypes.string.isRequired,
  objectId: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default RoomListItem;
