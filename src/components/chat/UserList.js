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
    const styles = {
      container: {
        minHeight: '200px',
        height: '500px',
        maxHeight: '500px',
        overflowY: 'scroll',
        padding: '10px',
        overflowX: 'hidden',
        border: 'solid 1px black'
      },
      list: {
        listStyleType: 'none',
        padding: 0
      }
    };

    return (
      <div style={styles.container} className="col-xs-3 col-sm-3 col-md-3 list-group">
        <ul style={styles.list}>
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
