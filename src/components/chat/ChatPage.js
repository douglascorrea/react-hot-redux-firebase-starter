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

import { getRooms, getCurrentRoom } from '../../selectors/chatxSelectors';
import { enterChat, leaveChat, createRoom, removeRoom, selectRoom } from '../../actions/chatxActions';

const mapStateToProps = (state) => ({
  currentRoom: getCurrentRoom(state),
  rooms: getRooms(state),
});

const mapDispatchToProps = {
  enterChat, leaveChat, createRoom, removeRoom, selectRoom,
};

@checkAuth
@connect(mapStateToProps, mapDispatchToProps)
class ChatPage extends React.Component {
  static propTypes = {
    enterChat: PropTypes.func.isRequired,
    leaveChat: PropTypes.func.isRequired,
    createRoom: PropTypes.func.isRequired,
    removeRoom: PropTypes.func.isRequired,
    selectRoom: PropTypes.func.isRequired,
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
        <ChatHeader currentRoom={this.props.currentRoom} />
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
            <MessageList />
          </MainColumn>
          <RightColumn>
            <UserList />
          </RightColumn>
        </div>
        <MessagePrompt />
      </div>
    );
  }
}

export default ChatPage;
