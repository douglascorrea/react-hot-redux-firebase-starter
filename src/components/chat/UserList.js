import React, {PropTypes} from 'react';
import UserListItem from './UserListItem';

const UserList = ({users}) => {
  return (
    <div>
      <h3>Users in the room</h3>
      <div className="user-list">
        {users.map((user, index) =>
          <UserListItem
            key={index}
            name={user.email}
          />
        )}
      </div>
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default UserList;
