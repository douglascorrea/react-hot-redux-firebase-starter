import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import checkAuth from '../requireAuth';
import TextInput from '../common/TextInput';
import firebaseApi from '../../api/firebase';
import RoomForm from './RoomForm';
import * as firebase from 'firebase/firebase-browser';
import {firebaseConfig} from '../../config';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messageList: []
    };

    this.setStateMessage = this.setStateMessage.bind(this);
    firebaseApi.firebaseMessaging.onMessage(this.setNewMessage.bind(this));
  }

  componentWillMount() {
        this.getNewMessage();
  }

  getNewMessage() {

    const LIMIT_MSG = 10;
    firebase.database().ref('messages/').limitToLast(LIMIT_MSG).on('value',  snapshot => {

    let obj = snapshot.val();
    const messages2 = Object.keys(obj).map((key) => {
       return <div key={key}>Message: {obj[key].msg}  From: {obj[key].author}</div>;
        });
    this.setState({messageList: messages2});
  });
  }


  setNewMessage(message) {

    this.getNewMessage();
  }

  setStateMessage(event) {
    this.setState({message: event.target.value});
  }


  render() {
    return (
      <div>
        <h1>Welcome to ChatX Page</h1>
        <div>
            {this.state.messageList}
        </div>
        <RoomForm
          value={this.state.message}
          onChange={this.setStateMessage}
          />
        <input
          type="submit"
          value="send"
          onClick={() => {
            firebaseApi.sendMessage(this.state.message);
          }}
          className="btn btn-primary"/>
      </div>
    );
  }
}

export default checkAuth(Room);
