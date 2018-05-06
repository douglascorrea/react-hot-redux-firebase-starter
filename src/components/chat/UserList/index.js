import React, { PropTypes } from 'react';

const UserList = ({ roomName, users }) => (
  <span>
    <h4>{roomName ? `#${roomName} Users` : 'No room joined'}</h4>
    <ul className="chatx-userlist list-group">
      {
        users.map(({ uid, email }) => (
          <li className="list-group-item" key={uid}>{email}</li>
        ))
      }
    </ul>
  </span>
);
UserList.propTypes = {
  roomName: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.shape({
    uid: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })).isRequired,
};
UserList.defaultProps = {
  roomName: '',
};

export default UserList;
