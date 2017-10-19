// Modules
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as firebase from 'firebase/firebase-browser';
import PropTypes from 'prop-types';
import R from 'ramda';

// Custom modules
import checkAuth from '../requireAuth';
import firebaseApi from '../../api/firebase';

// Custom components
import MessageList from './MessageList';
import UserList from './UserList';

// Component
class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.messageRef = firebase.database().ref('messages').limitToLast(10);
    this.userRef = firebase.database().ref('users');

    this.state = {
      connectedUsers: [],
      messages: [],
      newMessage: '',
      numberOfMessages: 10,
      numberOfConnectedUsers: 0
    };

    this.listenForMessages = this.listenForMessages.bind(this);
    this.listenForUsers = this.listenForUsers.bind(this);
    this.onChangeNewMessage = this.onChangeNewMessage.bind(this);
    this.submitNewMessage= this.submitNewMessage.bind(this);
  }

  componentDidMount() {
    this.listenForMessages(this.messageRef);
    this.listenForUsers(this.userRef);
  }

  listenForMessages(messageRef) {
    messageRef.on('value', snap => {
      const messages = [];

      snap.forEach(child => {
        messages.push({
          id: child.key,
          username: child.val().username,
          message: child.val().message,
          date: child.val().sendAt
        });
      });

      const compare2messages = (m1, m2) => m1.date === m2.date;
      const newMessages = R.differenceWith(compare2messages, messages, this.state.messages);

      this.setState(prevState => ({
        messages: R.concat(prevState.messages, newMessages),
        numberOfMessages: prevState.messages.length + newMessages.length
      }));
    });
  }

  listenForUsers(userRef) {
    userRef.on('value', snap => {
      const users = [];

      snap.forEach(child => {
        users.push({
          id: child.key,
          username: child.val().email
        });
      });

      this.setState({
        connectedUsers: users,
        numberOfConnectedUsers: users.length
      });
    });
  }
  getUsers() {
    const users = [
      { id: 0, username: 'frederic.mamath' },
      { id: 1, username: 'mathieu.mamath' },
      { id: 2, username: 'olivier.nguyen' },
      { id: 3, username: 'mickael.avril' }
    ];

    return users;
  }

  getMessages() {
    const messages = [
      { id: 0, username: 'frederic.mamath', message: 'Salut les gens !' },
      { id: 1, username: 'frederic.mamath', message: 'Oh ... Y\'a personne...' },
      { id: 2, username: 'mathieu.mamath', message: 'Salut le petit !' },
      { id: 3, username: 'frederic.mamath', message: 'Oh ! Mon frère ! Comment tu vas ?' },
      { id: 4, username: 'olivier.nguyen', message: 'Salut les frères !' },
      { id: 5, username: 'frederic.mamath', message: 'Oh ! Encore quelqu\'un !' }
    ];

    return messages;
  }

  renderUsers() {
    return this.state.connectedUsers.map(connectedUser => (
      <li key={connectedUser.id}>{connectedUser.id} - {connectedUser.username}</li>
    ));
  }

  renderMessages() {
    return this.state.messages.map(message => (
      <li key={message.id}>{message.id} - {message.username} - {message.message}</li>
    ));
  }

  onChangeNewMessage(event) {
    const message = event.target.value;
    this.setState({newMessage: message});
  }

  submitNewMessage() {
    const message = {
      username: this.props.userEmail,
      message: this.state.newMessage,
      sendAt: Date.now()
    };

    firebaseApi.databasePush('messages', message);
    this.setState({newMessage: ''});
  }

  render() {
    return (
      <div>
        <h1>Chat Room</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <p className="col-md-3">
                  User(s)
                </p>
                <p className="col-md-9">
                  Message(s)
                </p>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <ul>
                    {this.renderUsers()}
                  </ul>
                </div>
                <MessageList messages={this.state.messages}/>
              </div>
              <div className="row">
                <div className="col-md-10">
                  <div className="row">
                    <input
                      type="text"
                      value={this.state.newMessage}
                      className="col-md-12"
                      onChange={this.onChangeNewMessage}
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="row">
                    <button className="col-md-12" onClick={this.submitNewMessage}>Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/" activeClassName="active">Go to Home</Link>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    userEmail: R.propOr('Unknown', 'email', state.user)
  };
}

export default connect(mapStateToProps)(checkAuth(ChatPage));
