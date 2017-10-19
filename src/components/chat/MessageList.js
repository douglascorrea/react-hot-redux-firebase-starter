// Modules
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
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
      <Message key={message.id} text={message.message} from={message.username}/>
    ));
  }

  render() {
    const styles = {
      container: {
        minHeight: '200px',
        height: '500px',
        maxHeight: '500px',
        overflowY: 'scroll',
        padding: '10',
        border: 'solid 1px black'
      },
      list: {
        listStyleType: 'none',
        padding: 0
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
