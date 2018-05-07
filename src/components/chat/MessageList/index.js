import React, { PropTypes } from 'react';

const MessageList = ({ currentMessages }) => {
  return (
    <span>
      {
        currentMessages.map(message => (
          <p key={message.id}>
            <strong>{message.author.email}</strong>{': '}
            {message.content}
          </p>
        ))
      }
    </span>
  );
};
MessageList.propTypes = {
  currentMessages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};

export default MessageList;
