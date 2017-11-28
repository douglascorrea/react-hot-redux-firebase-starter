import React from 'react';

const OtherChatItem = ({chat, onJoin}) => {

  const _onJoin = () => onJoin(chat);

  const userCount = chat.users ? Object.keys(chat.users).length : 0;

  return (
    <li>
      {chat.name} ({userCount} user{userCount > 1 ? 's' : ''})
      <button type="button" className="btn btn-primary btn-xs" onClick={_onJoin}>
        join
      </button>
    </li>
  );
};

OtherChatItem.propTypes = {
  chat: React.PropTypes.object.isRequired,
  onJoin: React.PropTypes.func.isRequired
};

export default OtherChatItem;
