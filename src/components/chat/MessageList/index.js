import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import MainColumn from '../layout/MainColumn';
import connector from './connector';

class MessageList extends React.Component {
  static propTypes = {
    currentMessages: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.shape({
        email: PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
  }

  componentWillReceiveProps(nextProps) {
    // when receive new messages
    if (nextProps.currentMessages.length !== this.props.currentMessages.length) {
      const elem = findDOMNode(this);
      const scrollBottom = elem.scrollHeight - (elem.offsetHeight + elem.scrollTop);
      setImmediate(() => {
        if (scrollBottom <= 50) { // autoscroll with tolerance margin
          elem.scrollTo(0, elem.scrollHeight);
        }
      });
    }
  }

  render() {
    const { currentMessages } = this.props;
    return (
      <MainColumn>
        {
          currentMessages.map(message => (
            <p key={message.id}>
              <strong>{message.author.email}</strong>{': '}
              {message.content}
            </p>
          ))
        }
      </MainColumn>
    );
  }
}

export default connector(MessageList);
