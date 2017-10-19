// Modules
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Custom components
import Message from './Message';

// Component
export default class MessageList extends Component {
  renderMessages() {
    return this.props.messages.map(message => (
      <Message key={message.id} text={message.message} name={message.username}/>
    ));
  }

  render() {
    return(
      <div className="col-md-9">
        <ul>
          {this.renderMessages()}
        </ul>
      </div>
    );
  }
}

// Properties validation
MessageList.PropTypes = {
  messages: PropTypes.array.isRequired
};
