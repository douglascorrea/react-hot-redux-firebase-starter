import React from 'react';

import MainColumn from './layout/MainColumn';
import LeftColumn from './layout/LeftColumn';
import RightColumn from './layout/RightColumn';

import RoomCreator from './RoomCreator';
import RoomList from './RoomList';
import MessageList from './MessageList';
import UserList from './UserList';
import MessagePrompt from './MessagePrompt';

import checkAuth from '../requireAuth';


const ChatPage = () => (
  <div>
    <div className="chatx-header">
      <h2 className="chatx-title">ChatX on #general</h2>
      <button type="button" className="btn btn-xs btn-danger">
        Leave room
      </button>
    </div>
    <div className="row">
      <LeftColumn>
        <RoomCreator />
        <RoomList />
      </LeftColumn>
      <MainColumn>
        <MessageList />
      </MainColumn>
      <RightColumn>
        <UserList />
      </RightColumn>
    </div>
    <MessagePrompt />
  </div>
);

export default checkAuth(ChatPage);
