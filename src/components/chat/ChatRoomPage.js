import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Col, Row, Badge, Collection, CollectionItem } from 'react-materialize';
import Spinner from 'react-spinkit';

import MessageForm from './MessageForm';

import * as firebase from 'firebase/firebase-browser';
import checkAuth from '../requireAuth';

// ACTIONS
import * as chatRoomActions from '../../actions/chatRoomActions';

class ChatRoomPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      currentMessage: ""
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.updateCurrentMessage = this.updateCurrentMessage.bind(this);
  }

  componentWillMount() {
    this.props.actions.getChatRoomMessages();
  }

  sendMessage(event) {
    event.preventDefault();

    const currentUser = firebase.auth().currentUser;
    // Build message object to send to Firebase
    const message = {
      content: this.state.currentMessage,
      sender: {
        uid: currentUser.uid,
        email: currentUser.email,
        name: currentUser.displayName
      }
    };

    // Reset message input
    this.setState({
      currentMessage: ""
    });

    chatRoomActions.sendMessageToRoom(message);
  }

  /**
   * Update current user message
   * @param event: Event from user message input form
   */
  updateCurrentMessage(event) {
    this.setState({
      currentMessage: event.target.value
    })
  }

  render() {
    const { messages } = this.props;

    const displayMessage =
      (messages.length == 0 ?
        <Spinner spinnerName="three-bounce" />  :
        <div>
          <Collection>
            {
              Object.keys(messages).map(key => (
                <CollectionItem key={key}>
                  {messages[key].content}<Badge>{messages[key].sender.email}</Badge>
                </CollectionItem>
              ))
            }
          </Collection>
          <MessageForm
            message={this.state.currentMessage}
            onChange={this.updateCurrentMessage}
            onSubmit={this.sendMessage}/>
        </div>
      );

    return (
      <div className="container-fluid">
        <div className="row">
          {displayMessage}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return ({
    messages: state.chatroom.messages
  });
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(chatRoomActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(checkAuth(ChatRoomPage));
// export default checkAuth(ChatRoomPage);
