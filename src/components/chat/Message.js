import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Message extends Component {
  render() {
    return(
      <li>
          <p>{this.props.text} - {this.props.name}</p>
      </li>
    );
  }
}

Message.PropTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string
};

Message.defaultProps = {
  name: 'Unknown'
};
