import React from 'react';
import {Link} from 'react-router';
import checkAuth from '../requireAuth';
import SendMessage from '../../containers/SendMessage';

const ChatPage = () => {
  return (
    <div>
      <h1>
        There is only this #chan, feel free to talk about it :)
      </h1>
      <SendMessage />
    </div>
  );
};

export default checkAuth(ChatPage);
