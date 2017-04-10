import React from 'react';
import {Link} from 'react-router';
import checkAuth from '../requireAuth';

const ChatPage = () => {
  return (
    <div>
      <h1>Chat Page</h1>
    </div>
  );
};

export default checkAuth(ChatPage);
