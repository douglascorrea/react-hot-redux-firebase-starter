import React, {Component} from 'react';
import * as firebase from 'firebase/firebase-browser';
import MessageApi from '../../api/message';
import MessageForm from './MessageForm';
import Message from './Message';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.onMessageAddition = this.onMessageAddition.bind(this);
    this.registerToMessages(this.props.chat.key);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.chat.key !== this.props.chat.key) {
      this.unregisterToMessages();
      this.setState({messages: []});
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
    const messages = this.state.messages;
    const newMessage = data.val();
    newMessage.key = data.key;
    messages.push(newMessage);
    this.setState({messages});
  }

  getClassName(message) {
    let className = 'col-md-8';
    if(message.user.uid === firebase.auth().currentUser.uid) {
      className += ' col-md-offset-4';
    }
    return className;
  }

  render() {

    return (
      <div className="app-chat-room">
        <h1> {this.props.chat.name} </h1>
        <div className="app-messages">
          {this.state.messages.map(message => (
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
  chat: React.PropTypes.object.isRequired
};


export default ChatRoom;
