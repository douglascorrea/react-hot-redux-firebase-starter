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

    // Fetching only the last 10 messages
    this.messageRef = firebase.database().ref('messages').limitToLast(10);
    // Fetching only connected users
    this.userRef = firebase.database().ref('users').orderByChild('isConnected').equalTo(true);

    this.state = {
      connectedUsers: [],
      messages: [],
      newMessage: '',
      numberOfMessages: 0,
      numberOfConnectedUsers: 0
    };

    this.listenForMessages = this.listenForMessages.bind(this);
    this.listenForUsers = this.listenForUsers.bind(this);
    this.onChangeNewMessage = this.onChangeNewMessage.bind(this);
    this.submitNewMessage= this.submitNewMessage.bind(this);
  }

  componentWillMount() {
    // Disconnecting when closing window /!\ TO BE UPDATED /!\
    window.onbeforeunload = function() {
      // /!\ For some dark reasons ...                                             /!\
      // /!\ It looks like when i'm calling the API                           /!\
      // /!\ Nothing is happening anymore, not even the return /!\
      firebaseApi.databaseSet('/users/'+this.props.currentUserId+'/isConnected', false);

      return "Window is closing";
    };
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

      // Comparing messages's dates from previous state and new messages pulled from FB
      const compareOldAndNewMessages = (m1, m2) => m1.date === m2.date;
      // Getting only the messages that isn't showing yet
      const newMessages = R.differenceWith(compareOldAndNewMessages, messages, this.state.messages);

      // Adding new message to current messages
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

  onChangeNewMessage(event) {
    const message = event.target.value;
    this.setState({newMessage: message});
  }

  submitNewMessage(event) {
    event.preventDefault();

    const message = {
      username: this.props.currentUserEmail,
      message: this.state.newMessage,
      sendAt: Date.now()
    };

    firebaseApi.databasePush('messages', message);
    this.setState({newMessage: ''});
  }

  render() {
    const styles = {
        columnTitle: {
          textAlign: 'center',
          fontWeight: 'bold'
        }
    };

    return (
      <div>
        <h1>Chat Room</h1>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th style={styles.columnTitle} className="col-xs-3 col-sm-3 col-md-3">Connected user(s)</th>
                    <th style={styles.columnTitle} className="col-xs-9 col-sm-9 col-md-9">Message(s)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><UserList users={this.state.connectedUsers} className="col-xs-3 col-sm-3 col-md-3"/></td>
                    <td>
                      <MessageList
                        messages={this.state.messages}
                        currentUserEmail={this.props.currentUserEmail}
                        className="col-xs-9 col-sm-9 col-md-9"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <form className="row" onSubmit={this.submitNewMessage}>
                <div className="col-xs-10 col-sm-10 col-md-10">
                  <div className="row">
                    <input
                      type="text"
                      value={this.state.newMessage}
                      className="col-md-12 form-control"
                      onChange={this.onChangeNewMessage}
                    />
                  </div>
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2">
                  <div className="row">
                    <input type="submit" className="col-xs-12 col-sm-12 col-md-12 btn btn-primary" value="Send"/>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row">

          </div>
        </div>
        <Link to="/" activeClassName="active">Go to Home</Link>
      </div>
    );
  }
}

// Properties validation
ChatPage.propTypes = {
  currentUserEmail: PropTypes.string.isRequired,
  currentUserId: PropTypes.string.isRequired
};

// Connecting to store to get current user's information
function mapStateToProps(state, ownProps) {
  return {
    currentUserEmail: R.propOr('Unknown', 'email', state.user),
    currentUserId: R.propOr('Unknown', 'uid', state.user)
  };
}

export default connect(mapStateToProps)(checkAuth(ChatPage));
