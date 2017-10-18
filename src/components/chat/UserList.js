import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class UserList extends Component {
  render() {
    return(
      <li>
          <p>{this.props.text} - {this.props.name}</p>
      </li>
    );
  }
}

User.PropTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string
};

User.defaultProps = {
  name: 'Unknown'
};
