import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class User extends Component {
  render() {
    return(
      <li>
          <p>{this.props.name}</p>
      </li>
    );
  }
}

User.PropTypes = {
  name: PropTypes.string.isRequired
};

User.defaultProps = {
  name: 'Unknown'
};
