import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uuid from 'uuid/v4';

import firebaseApi from '~/api/firebase';

import {
  onLoadedRooms,
  setCurrentRoom,
  onLoadedUsers,
} from '~/actions/roomActions';
import {
  updateUser,
} from '~/actions/userActions';
import {
  onLoadedMessages,
} from '~/actions/messageActions';

import RoomList from '~/components/RoomList';
import RoomInput from '~/components/RoomInput';
import UserList from '~/components/UserList';
import MessageList from '~/components/MessageList';
import MessageInput from '~/components/MessageInput';

import requireAuth from '~/components/requireAuth';

import * as Ui from './Ui';

class Room extends React.PureComponent {
  static contextTypes = {
    router: PropTypes.shape({
    }),
  }

  static propTypes = {
    room: PropTypes.shape({
      messages: PropTypes.arrayOf(PropTypes.object),
    }),
    currentUserUID: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.listenMessages(true);
    this.listenRooms(true);
    this.listenUsers(true);
    window.onbeforeunload = () => {
      this.props.updateUser({
        ...this.props.user,
        roomId: '',
      });
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.params.roomId !== prevProps.params.roomId) {
      this.onChangeRoom();
    }
  }

  componentWillUnmount() {
    this.rooms.off();
    this.users.off();
    this.messages.off();
    this.props.updateUser({
      ...this.props.user,
      roomId: '',
    });
  }

  rooms = firebaseApi.GetDatabaseChild('/', 'rooms');
  users = firebaseApi.GetDatabaseChild('/', 'users');
  messages = firebaseApi.GetDatabaseChild('/', 'messages');

  onChangeRoom() {
    const { roomId } = this.props.params;
    this.listenUsers(true);
    this.listenMessages(true);
    this.props.setCurrentRoom(roomId);
    this.props.updateUser({
      ...this.props.user,
      roomId,
    });
  }

  listenMessages(firstTime = false) {
    let isFirstTime = firstTime;
    const { roomId } = this.props.params;
    this.messages.off();
    this.messages
      .orderByChild('roomId')
      .equalTo(roomId)
      .limitToLast(10)
      .on('value', (data) => {
        const value = data.val() || [];
        this.props.onLoadedMessages({
          isFirstTime,
          data: Object.values(value),
        });
        if (isFirstTime && this.props.user.uid) {
          this.props.updateUser({
            ...this.props.user,
            roomId,
          });
          isFirstTime = false;
        }
      });
  }

  listenRooms(firstTime = false) {
    let isFirstTime = firstTime;
    const { roomId } = this.props.params;
    this.rooms.off();
    this.rooms.on('value', (data) => {
      const value = data.val() || [];
      this.props.onLoadedRooms(Object.values(value));
      if (isFirstTime) {
        this.props.setCurrentRoom(roomId);
        isFirstTime = false;
      }
    });
  }

  listenUsers(firstTime = false) {
    let isFirstTime = firstTime;
    const { roomId } = this.props.params;
    this.users.off();
    this.users
      .orderByChild('roomId')
      .equalTo(roomId)
      .on('value', (data) => {
        const value = data.val() || [];
        this.props.onLoadedUsers({
          isFirstTime,
          data: Object.values(value),
        });
        if (isFirstTime) isFirstTime = false;
      });
  }

  changeRoom = ({ id }) => this.context.router.push(`/room/${id}`);

  sendMessage = (message, callback = () => 0) => {
    if (!message.data.length) return callback();
    message.id = uuid();
    message.userId = this.props.currentUserUID;
    message.date = (new Date()).getTime();
    message.roomId = this.props.params.roomId;
    message.user = {
      id: message.userId,
      displayName: this.props.user.displayName,
    };
    this.messages.push(message);
    return callback();
  }

  createRoom = (room, callback = () => 0) => {
    if (!room.name.length) return callback();
    room.id = uuid();
    room.ownerId = this.props.currentUserUID;
    room.owner = {
      id: room.ownerId,
      displayName: this.props.user.displayName,
    };
    this.rooms.push(room);
    return callback();
  };

  render() {
    return (
      <Ui.Container>
        <Ui.ListContainer>
          <RoomInput
            onCreate={this.createRoom}
          />
          <RoomList
            list={this.props.room.rooms}
            onPressRoom={this.changeRoom}
            currentRoomId={this.props.params.roomId}
          />
        </Ui.ListContainer>
        <Ui.MessageListContainer>
          <MessageList
            list={this.props.room.messages}
          />
          <MessageInput
            onSend={this.sendMessage}
          />
        </Ui.MessageListContainer>
        <Ui.ListContainer>
          <UserList
            list={this.props.room.users}
          />
        </Ui.ListContainer>
      </Ui.Container>
    );
  }
}

export default requireAuth(connect((state) => ({
  room: state.room,
  user: state.user,
  currentUserUID: state.auth.currentUserUID,
}), (dispatch) => bindActionCreators({
  onLoadedUsers,
  onLoadedRooms,
  onLoadedMessages,
  updateUser,
  setCurrentRoom,
}, dispatch))(Room));
