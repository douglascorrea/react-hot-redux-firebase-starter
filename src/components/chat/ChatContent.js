import React, { Component, PropTypes } from 'react';
import ChatListItem from './ChatListItem';
import ChatMessageForm from './ChatMessageForm';
import ChatUser from './ChatUser';
import ChatMessage from './ChatMessage';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {createMessage, updateMessages, updateUsers, joinChatRoom, leaveChatRoom} from '../../actions/chatActions';
import FirebaseApi from '../../api/firebase';

class ChatContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: {
        uid: Math.random().toString(36).substring(7),
        senderId: this.props.user.uid,
        body: "",
        postedAt: Date.now()
      }
    };

    let userId = this.props.user.uid;

    this.messagesRef = FirebaseApi.getData('chatrooms/'+this.props.uid+'/messages');
    this.usersRef = FirebaseApi.getData('chatrooms/'+this.props.uid+'/users');

    this.updateChatMessageState = this.updateChatMessageState.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.joinChatRoom = this.joinChatRoom.bind(this);
    this.leaveChatRoom = this.leaveChatRoom.bind(this);

    // DO SAME FOR USERS
  }

  componentDidUpdate() {
    if (this.props.chat) {
      // LOAD MESSAGES ON CHATROOM SELECT
        let messagesRef = FirebaseApi.getData('chatrooms/'+this.props.chat.uid+'/messages');

        messagesRef.on('value', snapshot => {

            let messages;
            messages = snapshot.val() ? Object.keys(snapshot.val()).map( key => {
                return snapshot.val()[key];
            }) :
            messages = [];

            this.props.updateMessages(messages);
        });

        // LOAD USERS ON CHATROOM SELECT
        let usersRef = FirebaseApi.getData('chatrooms/'+this.props.chat.uid+'/users');

        usersRef.on('value', snapshot => {

            let users;
            users = snapshot.val() ? Object.keys(snapshot.val()).map( key => {
                return snapshot.val()[key];
            }) :
            users = [];

            this.props.updateUsers(users);
        });
    }
  }

  // SET STATE WITH NEW MESSAGE
  updateChatMessageState(event) {
    let message = this.state.message;
    message['body'] = event.target.value;
    return this.setState({message: message});
  }

  // JOIN CHATROOM
  joinChatRoom() {
    event.preventDefault();
    this.props.actions.joinChatRoom(this.props.chat.uid, this.props.user);
  }

  // LEAVE CHATROOM
  leaveChatRoom() {
    event.preventDefault();
    this.props.actions.leaveChatRoom(this.props.chat.uid, this.props.user.uid);
  }

  // CREATE NEW MESSAGE
  createMessage(event) {
    event.preventDefault();
    this.props.actions.createMessage(this.props.chat.uid, this.state.message);
    // this.setState({message: { body: ''}});
  }

  renderUsers() {
    return this.props.users.map((user) => {
      return (<ChatUser
      key={user.uid}
      user={user} />);
    });
  }

  renderList() {
    return this.props.messages.map((message) => {
      return (<ChatMessage
      key={message.uid}
      mine={message.senderId == this.props.user.uid}
      message={message} />);
    });
  }

  render() {
    console.log(this.props.users);
    if (this.props.chat) {
      if(this.props.users.includes(this.props.user.email)) {
        return (
          <div className="panel panel-default col-sm-8">
            <h2>{this.props.chat.name}</h2>

            {this.renderUsers()}
            {this.renderList()}

            <ChatMessageForm
              onChange={this.updateChatMessageState}
              onSave={this.createMessage}
              message={this.state.message}
            />
            <button onClick={this.leaveChatRoom} className="btn btn-primary">Leave this chatroom</button>
          </div>
        );
      } else {
        return (
          <div className="panel panel-default col-sm-8">
            <h2>{this.props.chat.name}</h2>
            <p>You haven't joined this chatroom yet.</p>
            <button onClick={this.joinChatRoom} className="btn btn-primary">Join this chatroom</button>
          </div>
        );
      }
    } else {

        return (
          <div className="panel panel-default col-sm-8">
            <h2>Select a chatroom</h2>
          </div>
        );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    messages: state.messages,
    users: state.users,
    selectedChat: state.selectedChat
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({createMessage, updateMessages, updateUsers, joinChatRoom, leaveChatRoom}, dispatch),
    updateMessages: (messages) => dispatch(updateMessages(messages)),
    updateUsers: (users) => dispatch(updateUsers(users)),
    joinChatRoom: () => dispatch(joinChatRoom()),
    leaveChatRoom: () => dispatch(leaveChatRoom())
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatContent);
