import React, {Component} from 'react';
import * as firebase from 'firebase/firebase-browser';
import ChatRoomApi from '../../api/chatRoom';
import ChatRoomForm from './ChatRoomForm';
import MyChatItem from './MyChatItem';
import OtherChatItem from './OtherChatItem';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setActiveChat} from '../../actions/chatActions';

class ChatRoomsMenu extends Component {
  constructor(props) {
    super(props);
    this.seeChat = this.seeChat.bind(this);
    this.joinChat = this.joinChat.bind(this);
    this.leaveChat = this.leaveChat.bind(this);
  }

  getMyChats() {
    const uid = firebase.auth().currentUser.uid;
    return this.props.chats.filter(chat => chat.users && chat.users[uid]);
  }

  getOtherChats() {
    const uid = firebase.auth().currentUser.uid;
    return this.props.chats.filter(chat => !chat.users || !chat.users[uid]);
  }

  joinChat(chat) {
    ChatRoomApi.join(chat);
  }

  leaveChat(chat) {
    ChatRoomApi.leave(chat);
  }

  seeChat(chat) {
    this.props.actions.setActiveChat(chat);
  }

  getActiveChatUsers() {
    if (this.props.activeChat && this.props.activeChat.users) {
      const chatUsers = this.props.activeChat.users;
      return Object.keys(chatUsers).map(uid => ({name: chatUsers[uid], uid}));
    }

    return null;
  }

  render() {
    const users = this.getActiveChatUsers();
    const activeChatKey = this.props.activeChat ? this.props.activeChat.key : null;
    return (
      <div>
        <h3> My chats </h3>
        <ul>
          {this.getMyChats().map(chat => (
            <MyChatItem key={chat.key} chat={chat} onLeave={this.leaveChat} onSee={this.seeChat}
                        isActive={chat.key === activeChatKey}/>
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
    );
  }
}

ChatRoomsMenu.propTypes = {
  activeChat: React.PropTypes.object,
  chats: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    chats: state.chat.chats,
    activeChat: state.chat.activeChat
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({setActiveChat}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomsMenu);
