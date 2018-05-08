import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import MainColumn from './layout/MainColumn';
import LeftColumn from './layout/LeftColumn';
import RightColumn from './layout/RightColumn';

import HeaderContainer from './Header';
import RoomCreatorContainer from './RoomCreator';
import RoomListContainer from './RoomList';
import MessageListContainer from './MessageList';
import UserListContainer from './UserList';
import MessagePromptContainer from './MessagePrompt';

import checkAuth from '../requireAuth';
import { enterChat, leaveChat } from '../../actions/chatxActions';

@checkAuth
@connect(null, { enterChat, leaveChat })
class ChatPage extends React.Component {
  static propTypes = {
    enterChat: PropTypes.func.isRequired,
    leaveChat: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.enterChat();
  }

  componentWillUnmount() {
    this.props.leaveChat();
  }

  render() {
    return (
      <div>
        <HeaderContainer />
        <div className="row">
          <LeftColumn>
            <RoomCreatorContainer />
            <RoomListContainer />
          </LeftColumn>
          <MainColumn>
            <MessageListContainer />
          </MainColumn>
          <RightColumn>
            <UserListContainer />
          </RightColumn>
        </div>
        <MessagePromptContainer />
      </div>
    );
  }
}

export default ChatPage;
