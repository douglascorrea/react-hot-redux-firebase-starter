import React from 'react';
import {Link} from 'react-router';

const ChatRoomLink = () => {
  return (<Link to="/room" className="nav-item" activeClassName="active">Chat</Link>);
};

export default ChatRoomLink;
