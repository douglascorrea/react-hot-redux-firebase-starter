// Modules
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Custom components
import Message from './Message';

// Component
export default class MessageList extends Component {
  renderMessages() {
    return this.props.messages.map(message => (
      <Message key={message.id} text={message.message} from={message.username}/>
    ));
  }

  render() {
    const styles = {
      container: {
        minHeight: '200px',
        maxHeight: '500px',
        overflowY: 'scroll'
      },
      list: {
        listStyleType: 'none'
      }
    };

    return(
      <div style={styles.container} className="col-xs-9 col-sm-9 col-md-9">
        <ul style={styles.list}>
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
