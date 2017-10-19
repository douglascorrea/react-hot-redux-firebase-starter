// Modules
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Custom components
import User from './User';

// Component
export default class UserList extends Component {
  constructor(props) {
    super(props);
  }

  renderUsers() {
    return this.props.users.map(user => (
      <User key={user.id} name={user.username}/>
    ));
  }

  render() {
    return(
      <div className="col-xs-3 col-sm-3 col-md-3">
        <ul>
          {this.renderUsers()}
        </ul>
      </div>
    );
  }
}

// Properties validation
UserList.PropTypes = {
  users: PropTypes.array
};

UserList.defaultProps = {
  users: []
};
