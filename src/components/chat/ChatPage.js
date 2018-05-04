import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import MainColumn from './layout/MainColumn';
import LeftColumn from './layout/LeftColumn';
import RightColumn from './layout/RightColumn';

import RoomCreator from './RoomCreator';
import RoomList from './RoomList';
import MessageList from './MessageList';
import UserList from './UserList';
import MessagePrompt from './MessagePrompt';

import checkAuth from '../requireAuth';

import { getRooms } from '../../selectors/chatxSelectors';
import { enterChat, leaveChat, createRoom, removeRoom } from '../../actions/chatxActions';

const mapStateToProps = (state) => ({
  rooms: getRooms(state),
});

const mapDispatchToProps = {
  enterChat, leaveChat, createRoom, removeRoom,
};

@checkAuth
@connect(mapStateToProps, mapDispatchToProps)
class ChatPage extends React.Component {
  static propTypes = {
    enterChat: PropTypes.func.isRequired,
    leaveChat: PropTypes.func.isRequired,
    createRoom: PropTypes.func.isRequired,
    removeRoom: PropTypes.func.isRequired,
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
        <div className="chatx-header">
          <h2 className="chatx-title">ChatX on #general</h2>
          <button type="button" className="btn btn-xs btn-danger">
            Leave room
          </button>
        </div>
        <div className="row">
          <LeftColumn>
            <RoomCreator onCreate={this.props.createRoom} />
            <RoomList
              onRoomRemove={this.props.removeRoom}
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
