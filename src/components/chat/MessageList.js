import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Message from './Message';

export default class MessageList extends Component {
  render() {
    return(
      <div className="col-md-9">
        <ul>
          {this.props.messages.map(message => <Message text={message.message} name={message.username}/>)}
        </ul>
      </div>
    );
  }
}

MessageList.PropTypes = {
  messages: PropTypes.array
};

MessageList.defaultProps = {
  messages: []
};
