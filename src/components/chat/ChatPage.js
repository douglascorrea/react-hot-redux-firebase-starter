import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as firebase from 'firebase/firebase-browser';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { postMessageRequest, getAllMessage } from '../../actions/channelActions';
import checkAuth from '../requireAuth';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const primaryColor = '#0084ff';

/**
 * Here we defined messages as an mobx observable object.
 * When we use "observer" (mobx-react) on a component, each time that
 * "messages" observable object will change, the component will be updated
 */
@observer
class ChatPage extends React.Component {

  @observable messages = []

  componentDidMount() {

    let firstItem = true;
    this.messageDB = firebase.database().ref('messages').orderByKey().limitToLast(15);
    this.messageDB.on('child_added', snapshot => {
      if(firstItem) {
        firstItem = false
      } else {
        this.messages.push({
          user: snapshot.val().user,
          message: snapshot.val().message
        });
      }
    });
  }

  componentWillUnmount() {
    // Stop listening for messages when user left the page
    this.messageDB.off()
    // Ensuring that we don't keep the reference
    this.messageDB = null;
  }

  onNewMessage = (message) => {
    postMessageRequest({
      message,
      user: this.props.user.email
    });
  }

  render() {
    return (
      <div>
        <div className="conversationHeader">
          <h3>#general</h3>
        </div>

        <MessageList 
          messages={this.messages}
          user={this.props.user}
        />

        <MessageInput 
          onNewMessage={this.onNewMessage} 
        />

        <style jsx>
          {`
          .conversationHeader {
            background-color: ${primaryColor};
            padding: 10px 0;
            border-bottom: 2px solid #0175e1;
          }

          h3 {
            text-align: center;
            margin-top: 0px;
            color: white;
          }
        `}
        </style>

        <style jsx global>
          {`
          .chatHeader {
            background-color: ${primaryColor};
            color: white;
          }

          chatHeader, .chatHeader a, .chatHeader a:visited, .chatHeader a:link {
            color: white;
          }

          .chatHeader a.active {
            color: orange;
          }
        `}
        </style>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    messages: state.channel.messages,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getAllMessage, postMessageRequest }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  checkAuth(ChatPage)
);
