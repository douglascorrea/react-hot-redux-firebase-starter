import React from 'react';
import {Link} from 'react-router';
import checkAuth from '../requireAuth';
const ChatPage = () => {
  return (
    <div>
      <h1>There is only this #chan, feel free to talk about</h1>
      <Link to="/" activeClassName="active">Home</Link>
    </div>
  );
};

export default checkAuth(ChatPage);
