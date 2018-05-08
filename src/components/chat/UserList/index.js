import React, { PropTypes } from 'react';

import connector from './connector';

export const UserList = ({ currentRoomName, users }) => (
  <span>
    <h4>{currentRoomName ? `#${currentRoomName} Users` : 'No room joined'}</h4>
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
  currentRoomName: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.shape({
    uid: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })).isRequired,
};
UserList.defaultProps = {
  currentRoomName: '',
};

export default connector(UserList);
