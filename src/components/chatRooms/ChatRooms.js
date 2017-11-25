import React, {Component} from 'react';
import * as firebase from 'firebase/firebase-browser';
import checkAuth from '../requireAuth';
import ChatRoomApi from '../../api/chatRoom';
import ChatRoomForm from './ChatRoomForm';
import MyChatItem from './MyChatItem';
import OtherChatItem from './OtherChatItem';
import ChatRoom from './ChatRoom';

class ChatRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatRooms: [],
      activeChat: null
    };
    this.onChatRoomAddition = this.onChatRoomAddition.bind(this);
    this.onChatRoomChanged = this.onChatRoomChanged.bind(this);
    this.seeChat = this.seeChat.bind(this);
    this.joinChat = this.joinChat.bind(this);
    this.leaveChat = this.leaveChat.bind(this);
    ChatRoomApi.getRef().on('child_added', this.onChatRoomAddition);
    ChatRoomApi.getRef().on('child_changed', this.onChatRoomChanged);
  }

  componentWillUnmount() {
    ChatRoomApi.getRef().off('child_added', this.onChatRoomAddition);
    ChatRoomApi.getRef().off('child_changed', this.onChatRoomChanged);
  }

  getMyChats() {
    const uid = firebase.auth().currentUser.uid;
    return this.state.chatRooms.filter(chat => chat.users && chat.users[uid]);
  }

  getOtherChats() {
    const uid = firebase.auth().currentUser.uid;
    return this.state.chatRooms.filter(chat => !chat.users || !chat.users[uid]);
  }

  onChatRoomAddition(data) {
    let chatRooms = this.state.chatRooms;
    let newChat = data.val();
    newChat.key = data.key;
    chatRooms.push(newChat);
    this.setState({chatRooms});
  }

  onChatRoomChanged(data) {
    const chatRooms = this.state.chatRooms;
    const updatedChat = data.val();
    updatedChat.key = data.key;
    const index = chatRooms.findIndex(chat => chat.key === updatedChat.key);

    chatRooms.splice(index, 1, updatedChat);

    this.setState({chatRooms});
  }

  joinChat(chat) {
    ChatRoomApi.join(chat);
  }

  leaveChat(chat) {
    if (this.state.activeChat === chat) {
      this.setState({activeChat: null});
    }
    ChatRoomApi.leave(chat);
  }

  seeChat(chat) {
    this.setState({activeChat: chat});
  }

  getUsers() {
    if (this.state.activeChat && this.state.activeChat.users) {
      const chatUsers = this.state.activeChat.users;
      return Object.keys(chatUsers).map(uid => ({name: chatUsers[uid], uid}));
    }

    return null;
  }

  render() {
    let users = this.getUsers();

    return (
      <div>
        <h1> Chat Rooms </h1>
        <p> Welcome to the Chat Rooms ! </p>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h3> My chats </h3>
              <ul>
                {this.getMyChats().map(chat => (
                  <MyChatItem key={chat.key} chat={chat} onLeave={this.leaveChat} onSee={this.seeChat}
                              isActive={chat === this.state.activeChat}/>
                ))}
              </ul>

              <ChatRoomForm/>

              <h3> Other chats </h3>
              <ul>
                {this.getOtherChats().map(chat => (
                  <OtherChatItem key={chat.key} chat={chat} onJoin={this.joinChat}/>
                ))}
              </ul>
              {users &&
              <div>
                <h3> Users in current chat </h3>
                <ul>
                  {users.map(user => (
                    <li key={user.uid}> {user.name} </li>
                  ))}
                </ul>
              </div>
              }
            </div>

            <div className="col-md-8">
              {!this.state.activeChat &&
              <h3> Please select, join or create a chat </h3>
              }
              {this.state.activeChat &&
              <ChatRoom chat={this.state.activeChat}/>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default checkAuth(ChatRooms);
