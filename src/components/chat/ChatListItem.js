import React from 'react';

const ChatListItem = ({chat, onChatSelect}) => {

  return (
    <li onClick={() => onChatSelect(chat)} className="list-group-item redy">
      {chat.name}
    </li>
  );
};

ChatListItem.propTypes = {
  chat: React.PropTypes.object,
  onChatSelect: React.PropTypes.func.isRequired
};

export default ChatListItem;
