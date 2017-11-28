import React from 'react';

const MyChatItem = ({chat, onLeave, isActive, onSee}) => {

  const _onLeave = () => onLeave(chat);
  const _onSee = () => onSee(chat);

  const userCount = chat.users ? Object.keys(chat.users).length : 0;

  return (
    <li>
      {chat.name} ({userCount} user{userCount > 1 ? 's' : ''})
      <button type="button" className="btn btn-xs btn-primary" onClick={_onSee} disabled={isActive}>
        see
      </button>
      <button type="button" className="btn btn-danger btn-xs" onClick={_onLeave}>
        leave
      </button>
    </li>
  );
};

MyChatItem.propTypes = {
  chat: React.PropTypes.object.isRequired,
  isActive: React.PropTypes.bool.isRequired,
  onLeave: React.PropTypes.func.isRequired,
  onSee: React.PropTypes.func.isRequired
};

export default MyChatItem;
