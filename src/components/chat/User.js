// Modules
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Component
export default class User extends Component {
  render() {
    return(
      <li id="name" className="list-group-item">
          {this.props.name}
      </li>
    );
  }
}

// Properties validation
User.propTypes = {
  name: PropTypes.string.isRequired
};

User.defaultProps = {
  name: ''
};
