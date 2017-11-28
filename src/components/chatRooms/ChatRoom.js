import React, {Component} from 'react';
import * as firebase from 'firebase/firebase-browser';
import MessageApi from '../../api/message';
import MessageForm from './MessageForm';
import Message from './Message';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addMessageFromData} from '../../actions/chatActions';
import classnames from 'classnames';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.onMessageAddition = this.onMessageAddition.bind(this);
    this.registerToMessages(this.props.chat.key);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.chat.key !== this.props.chat.key) {
      this.unregisterToMessages();
      this.registerToMessages(nextProps.chat.key);
    }
  }

  componentWillUnmount() {
    this.unregisterToMessages();
  }

  unregisterToMessages() {
    MessageApi.getRef().off('child_added', this.onMessageAddition);
  }

  registerToMessages(chatKey) {
    MessageApi.getRef().orderByChild('chatKey').equalTo(chatKey).limitToLast(10).on('child_added', this.onMessageAddition);
  }

  onMessageAddition(data) {
    this.props.actions.addMessageFromData(data);
  }

  getClassName(message) {
    return classnames('col-md-8', {
      'col-md-offset-4': message.user.uid === firebase.auth().currentUser.uid
    });
  }

  render() {

    return (
      <div className="app-chat-room">
        <h1> {this.props.chat.name} </h1>
        <div className="app-messages">
          {this.props.messages.map(message => (
            <div key={message.key} className={this.getClassName(message)}>
              <div className="col-md-8">
              <Message message={message}/>
              </div>
            </div>
          ))}
        </div>
        <MessageForm chatKey={this.props.chat.key}/>
      </div>
    );
  }
}

ChatRoom.propTypes = {
  chat: React.PropTypes.object.isRequired,
  messages: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const chat = ownProps.chat || state.chat.activeChat;
  return {
    chat,
    messages: state.chat.activeChatMessages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({addMessageFromData}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
