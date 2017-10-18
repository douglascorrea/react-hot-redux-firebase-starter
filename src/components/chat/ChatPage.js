// Modules
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as firebase from 'firebase/firebase-browser';
import R from 'ramda';

// Custom modules
import checkAuth from '../requireAuth';
import firebaseApi from '../../api/firebase';
import Messages from './Messages';

// Component
class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.messageRef = firebase.database().ref('messages');

    this.state = {
      messages: [],
      numberOfMessages: 0,
      newMessage: ''
    };

    this.listenForMessages = this.listenForMessages.bind(this);
    this.onChangeNewMessage = this.onChangeNewMessage.bind(this);
    this.submitNewMessage= this.submitNewMessage.bind(this);
  }

  componentDidMount() {
    this.listenForMessages(this.messageRef);
  }

  listenForMessages(messageRef) {
    messageRef.on('value', snap => {
      const messages = [];

      snap.forEach((child) => {
        messages.push({
          id: child.key,
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
                <Messages messages={this.state.messages}/>
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
    userEmail: R.propOr('', 'email', state.user)
  };
}

export default connect(mapStateToProps)(checkAuth(ChatPage));
