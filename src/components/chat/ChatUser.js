import React from 'react';

const ChatUserItem = ({user}) => {

  return (
    <div className="chat-user">
      {user}
    </div>
  );
};

ChatUserItem.propTypes = {
  user: React.PropTypes.object
};

export default ChatUserItem;
