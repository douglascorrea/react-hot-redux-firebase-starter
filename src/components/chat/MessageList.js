// Modules
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// Custom components
import Message from './Message';

// Component
export default class MessageList extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.messages.length === prevProps.messages.length+1) {
      const componentDOM = ReactDOM.findDOMNode(this);
      componentDOM.scrollTop = componentDOM.scrollHeight;
    }
  }

  renderMessages() {
    return this.props.messages.map(message => (
      <Message key={message.id} text={message.message} from={message.username} date={message.date} currentUserEmail={this.props.currentUserEmail}/>
    ));
  }

  render() {
    const styles = {
      container: {
        minHeight: '200px',
        height: '500px',
        maxHeight: '500px',
        overflowY: 'scroll',
        padding: '10px'
      },
      list: {
        listStyleType: 'none',
        padding: 0
      }
    };

    return(
      <div style={styles.container}>
        <ul style={styles.list}>
          {this.renderMessages()}
        </ul>
      </div>
    );
  }
}

// Properties validation
MessageList.propTypes = {
  currentUserEmail: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired
};
