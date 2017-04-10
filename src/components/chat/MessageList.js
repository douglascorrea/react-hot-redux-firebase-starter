import React, {PropTypes} from 'react';
import MessageListItem from './MessageListItem';

const MessageList = ({messages, currentUser}) => {
  return (
    <div>
      <h3>Messages</h3>
      <div className="message-list">
        {messages.map((message, index) =>
          <MessageListItem
            key={index}
            value={message.value}
            from={message.from}
            currentUser={currentUser}
          />
        )}
      </div>
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentUser: PropTypes.object
};

export default MessageList;
