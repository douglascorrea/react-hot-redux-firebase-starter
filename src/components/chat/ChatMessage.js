import React from 'react';

const ChatMessage = ({message, mine}) => {
  if (!message) {
    return <div>Loading...</div>
  }

  return (
    <div className="col-md-12 messageContainer">
      <div className={"message " + (mine ? 'mine' : '')}>
        <p>{message.body}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
