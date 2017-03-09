/**
 * Created by clementlucas on 08/03/2017.
 */

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ChatRoomList from './ChatRoomList';
import ChatRoomFocus from './ChatRoomFocus';
import * as firebase from 'firebase/firebase-browser';

import {Col, Row, FormControl, Button} from 'react-bootstrap';

import {createChatRoom, getChatRooms, connectChatRoom, sendMessageToRoom} from '../../actions/chatRoomActions';

class ChatRoomListPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      chatRoomsLoading: true,
      newChatRoomName: '',
      selectedChatRoom: '',
      chatRoomLoaded: true,
    };

    this.loadChatRooms = this.loadChatRooms.bind(this);
    this.endLoading = this.endLoading.bind(this);
    this.onCreateNewChatRoom = this.onCreateNewChatRoom.bind(this);
    this.sendMessageToRoom = this.sendMessageToRoom.bind(this);
    this.onChangeNewChatRoomName = this.onChangeNewChatRoomName.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    this.loadChatRooms();
  }

  loadChatRooms() {
    this.setState({
      chatRoomsLoading: true
    });

    this.props.actions.getChatRooms()
      .then(this.endLoading, this.endLoading);
  }

  endLoading() {
    this.setState({chatRoomsLoading: false});
  }

  onChangeNewChatRoomName(event) {
    event.preventDefault();
    this.setState({
      newChatRoomName: event.target.value
    });
  }

  onCreateNewChatRoom() {
    this.props.actions.createChatRoom(this.state.newChatRoomName)
      .then(() => {
        this.setState({newChatRoomName: ''});
        this.loadChatRooms();
      });
  }

  sendMessageToRoom(message) {
    const currentUser = firebase.auth().currentUser;
    // Build message object to send to Firebase
    const newMessage = {
      content: message,
      sender: {
        userId: currentUser.uid,
        email: currentUser.email,
      }
    };

    const chatRoomId = this.props.currentChatRoom.id;

    this.props.actions.sendMessageToRoom(chatRoomId, newMessage)
      .then(() => {});
  }

  onSelect(selectedChatRoom) {

    this.setState({
      selectedChatRoom: selectedChatRoom
    });

    this.props.actions.connectChatRoom(selectedChatRoom)
      .then(ref => {
        this.setState({
          chatRoomLoaded: false, messagesReference: ref
        });
      });
  };

  render() {
    const {chatrooms} = this.props;

    return (
      <div className="container-fluid">
        <Row>
          <Col sm={6}>
            {/* ChatRoom form */}
            <Row>
              <Col sm={6}>
                <FormControl
                  name="text"
                  placeholder="New chatroom name"
                  onChange={this.onChangeNewChatRoomName}
                  value={this.state.newChatRoomName}/>
              </Col>
              <Col sm={2}>
                <Button
                  disabled={(/^\s*$/).test(this.state.newChatRoomName)}
                  type="submit"
                  onClick={this.onCreateNewChatRoom}>
                  Send
                </Button>
              </Col>
            </Row>
            {/* Chatroom list */}
            <Row>
              <ChatRoomList chatrooms={chatrooms} onSelect={this.onSelect}/>
            </Row>
          </Col>
          {/* Focused chatroom*/}
          <Col sm={6}>
            <ChatRoomFocus chatroom={this.props.currentChatRoom} onSend={this.sendMessageToRoom}/>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    chatrooms: state.chat.chatrooms,
    currentChatRoom: state.chat.currentChatRoom || null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({createChatRoom, getChatRooms, connectChatRoom, sendMessageToRoom}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomListPage);
