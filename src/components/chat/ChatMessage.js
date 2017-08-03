import React from 'react';

const ChatMessage = ({message}) => {
  if (!message) {
    return <div>Loading...</div>
  }

  return (
    <div className={"message col-md-8 " + (message.mine ? 'mine' : '')}>
      <p>{message.body}</p>
    </div>
  );
};

export default ChatMessage;
