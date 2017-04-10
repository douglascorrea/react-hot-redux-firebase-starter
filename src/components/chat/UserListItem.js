import React, {PropTypes} from 'react';

const UserListItem = ({name}) => {
  return (
    <div className="user">
      <span className="user-name">{name}</span>
    </div>
  );
};

UserListItem.propTypes = {
  name: PropTypes.string.isRequired
};

export default UserListItem;
