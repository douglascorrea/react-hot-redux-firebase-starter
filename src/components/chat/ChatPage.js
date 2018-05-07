import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import MainColumn from './layout/MainColumn';
import LeftColumn from './layout/LeftColumn';
import RightColumn from './layout/RightColumn';

import ChatHeader from './Header';
import RoomCreator from './RoomCreator';
import RoomList from './RoomList';
import MessageList from './MessageList';
import UserList from './UserList';
import MessagePrompt from './MessagePrompt';

import checkAuth from '../requireAuth';

import {
  getRooms,
  getCurrentRoom,
  getCurrentRoomUsers,
  getCurrentRoomIsJoined,
  getCurrentMessages,
} from '../../selectors/chatxSelectors';
import {
  enterChat, leaveChat,
  createRoom, removeRoom, selectRoom,
  joinRoom, leaveRoom,
  changedUserMessage, sendMessage,
} from '../../actions/chatxActions';

const mapStateToProps = (state) => ({
  currentRoomIsJoined: getCurrentRoomIsJoined(state),
  roomUsers: getCurrentRoomUsers(state),
  currentRoom: getCurrentRoom(state),
  rooms: getRooms(state),
  currentMessages: getCurrentMessages(state),
});

const mapDispatchToProps = {
  enterChat, leaveChat,
  createRoom, removeRoom, selectRoom,
  joinRoom, leaveRoom,
  changedUserMessage, sendMessage,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const props = { ...stateProps, ...dispatchProps, ...ownProps };
  const roomId = props.currentRoom.id;
  return {
    ...props,
    changedUserMessage: userMessage => (
      dispatchProps.changedUserMessage({ room: roomId, userMessage })
    ),
    sendMessage: message => (
      dispatchProps.sendMessage({ room: roomId, message })
    ),
  };
};

@checkAuth
@connect(mapStateToProps, mapDispatchToProps, mergeProps)
class ChatPage extends React.Component {
  static propTypes = {
    currentRoomIsJoined: PropTypes.bool.isRequired,
    currentMessages: PropTypes.array.isRequired,
    roomUsers: PropTypes.arrayOf(PropTypes.shape({
      uid: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })).isRequired,
    enterChat: PropTypes.func.isRequired,
    leaveChat: PropTypes.func.isRequired,
    createRoom: PropTypes.func.isRequired,
    removeRoom: PropTypes.func.isRequired,
    selectRoom: PropTypes.func.isRequired,
    joinRoom: PropTypes.func.isRequired,
    leaveRoom: PropTypes.func.isRequired,
    changedUserMessage: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    currentRoom: PropTypes.object.isRequired,
    rooms: PropTypes.array,
  }

  static defaultProps = {
    rooms: [],
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
        <ChatHeader
          onJoin={this.props.joinRoom}
          onLeave={this.props.leaveRoom}
          isJoined={this.props.currentRoomIsJoined}
          currentRoom={this.props.currentRoom}
        />
        <div className="row">
          <LeftColumn>
            <RoomCreator onCreate={this.props.createRoom} />
            <RoomList
              currentRoom={this.props.currentRoom}
              onRoomRemove={this.props.removeRoom}
              onRoomSelect={this.props.selectRoom}
              rooms={this.props.rooms}
            />
          </LeftColumn>
          <MainColumn>
            <MessageList
              currentMessages={this.props.currentMessages}
            />
          </MainColumn>
          <RightColumn>
            <UserList
              roomName={this.props.currentRoom.name}
              users={this.props.roomUsers}
            />
          </RightColumn>
        </div>
        <MessagePrompt
          message={this.props.currentRoom.userMessage}
          onMessageChange={this.props.changedUserMessage}
          onMessageSubmit={this.props.sendMessage}
          currentRoomName={this.props.currentRoom.name}
          currentRoomIsJoined={this.props.currentRoomIsJoined}
        />
      </div>
    );
  }
}

export default ChatPage;
