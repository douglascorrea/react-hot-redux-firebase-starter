import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createChat, updateChatrooms} from '../../actions/chatActions';
import FirebaseApi from '../../api/firebase';

import ChatList from './ChatList';
import ChatForm from './ChatForm';
import ChatContent from './ChatContent';
import * as firebase from 'firebase/firebase-browser';
import toastr from 'toastr';

class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatRooms: [],
      selectedChat: null,
      chatRoom: {
        name: "",
        uid: Math.random().toString(36).substring(7),
        users: []
      }
    };

    this.chatroomsRef = FirebaseApi.getData('chatrooms');

    this.updateChatState = this.updateChatState.bind(this);
    this.createChat = this.createChat.bind(this);
  }

  componentDidMount() {

    this.chatroomsRef.on('value', snapshot => {

        let chatrooms;
        chatrooms = snapshot.val() ? Object.keys(snapshot.val()).map( key => {
            return snapshot.val()[key];
        }) :
        chatrooms = [];

        this.props.updateChatrooms(chatrooms);
    });
  }

  componentWillUnmount() {
    this.chatroomsRef.on('value').off();
  }

  // SET STATE WITH NEW CHATROOM
  updateChatState(event) {
    const field = event.target.name;
    let chatRoom = this.state.chatRoom;
    chatRoom[field] = event.target.value;
    return this.setState({chatRoom: chatRoom});
  }

  // CREATE NEW CHATROOM
  createChat(event) {
    event.preventDefault();
    this.props.actions.createChat(this.state.chatRoom);
    // MOVE TO NEWLY CREATED CHATROOM
    this.setState({selectedChat: this.state.chatRoom.uid});
  }

  render() {
    return (
      <div>
        <ChatForm
          onChange={this.updateChatState}
          onSave={this.createChat}
          saving={this.state.saving}
          chatRoom={this.state.chatRoom}
        />
         <ChatList
        onChatSelect={selectedChat => this.setState({selectedChat})}
        chatRooms={this.state.chatRooms}/>
       <ChatContent chat={this.state.selectedChat} />
      </div>
    );
  }
}

ChatPage.propTypes = {
  actions: PropTypes.object.isRequired
};

ChatPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({createChat, updateChatrooms}, dispatch),
    updateChatrooms: (chatrooms) => dispatch(updateChatrooms(chatrooms))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
