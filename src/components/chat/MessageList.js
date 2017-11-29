import React, { PropTypes } from 'react';
import prop from 'lodash/fp/prop';
import MessageItem from './MessageItem';

const MessageList= ({ messages }) =>
  <div>
    <h4>Messages</h4>
    <div className="message-list">
      {messages.map((message, index) =>
        <MessageItem
          key={index}
          value={prop('value')(message)}
          from={prop('from')(message)}
        />
      )}
    </div>
  </div>;

MessageList.defaultProps = {
  messages: [],
};

MessageList.propTypes = {
  messages: PropTypes.array,
};

export default MessageList;
