import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import MainColumn from '../layout/MainColumn';
import connector from './connector';

class MessageList extends React.Component {
  static propTypes = {
    userIsAdmin: PropTypes.bool,
    currentRoomIsOwned: PropTypes.bool.isRequired,
    currentUserId: PropTypes.string.isRequired,
    currentMessages: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.shape({
        id: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
    removeMessage: PropTypes.func.isRequired,
  }

  static defaultProps = {
    userIsAdmin: false,
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
    const {
      currentMessages, currentUserId, userIsAdmin,
      currentRoomIsOwned, removeMessage,
    } = this.props;
    return (
      <MainColumn>
        {
          currentMessages.map(message => {
            const canRemove = userIsAdmin ||currentRoomIsOwned || message.author.id === currentUserId;
            const onRemoveClick = () => removeMessage(message.id);
            return (
              <p key={message.id} className="chatx-message-container">
                <span className="chatx-message">
                  <strong>{message.author.email}</strong>{': '}
                  {message.content}
                </span>
                {canRemove && <span className="chatx-message-remove-button">
                  <button onClick={onRemoveClick} title="Remove message" className="close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </span>}
              </p>
            );
          })
        }
      </MainColumn>
    );
  }
}

export default connector(MessageList);
