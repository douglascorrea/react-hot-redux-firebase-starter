import React, { PropTypes } from 'react';

import connector from './connector';

export const UserList = ({ currentRoomName, users }) => (
  <span>
    <h4>{currentRoomName ? `#${currentRoomName} Users` : 'No room joined'}</h4>
    <ul className="chatx-userlist list-group">
      {
        users.map(({ id, email, isOwner }) => (
          <li className="list-group-item" key={id}>
            <span className="badge">
              <span
                className={`glyphicon glyphicon-${isOwner ? 'king' : 'user'}`}
              ></span>
            </span>
            {email}
          </li>
        ))
      }
    </ul>
  </span>
);
UserList.propTypes = {
  currentRoomName: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })).isRequired,
};
UserList.defaultProps = {
  currentRoomName: '',
};

export default connector(UserList);
