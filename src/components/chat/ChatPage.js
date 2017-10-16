// Modules
import React from 'react';
import {Link} from 'react-router';
import * as firebase from 'firebase/firebase-browser';

// Custom modules
import {firebaseConfig} from '../../config';
import checkAuth from '../requireAuth';
import firebaseApi from '../../api/firebase';

// Component
class ChatPage extends React.Component {
  constructor(props) {
    super(props);

    this.messageRef = firebase.database().ref('messages');

    this.state = {
      messages: [],
      numberOfMessages: 0
    };

    this.listenForMessages = this.listenForMessages.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.listenForMessages(this.messageRef);
  }

  listenForMessages(messageRef) {
    messageRef.on('value', (snap) => {
      const messages = [];

      snap.forEach((child) => {
        messages.push({
          username: child.val().username,
          message: child.val().message,
          date: child.val().sendAt
        });
      });

      this.setState({
        messages: messages,
        numberOfMessages: messages.length
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
    return this.getUsers().map(user => (
      <li key={user.id}>{user.id} - {user.username}</li>
    ));
  }

  renderMessages() {
    return this.state.messages.map(message => (
      <li key={message.id}>{message.id} - {message.username} - {message.message}</li>
    ));
  }

  sendMessage() {
    const message = {
        username: 'frederic.mamath',
        message: 'Hello world !',
        sendAt: Date.now()
    };

    firebaseApi.databasePush('messages', message);
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
                <div className="col-md-9">
                  <ul>
                    {this.renderMessages()}
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-md-10">
                  <div className="row">
                    <input type="text" className="col-md-12"/>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="row">
                    <button className="col-md-12" onClick={() => this.sendMessage()}>Send</button>
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

export default checkAuth(ChatPage);
