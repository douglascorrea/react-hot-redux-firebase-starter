import * as firebase from 'firebase/firebase-browser';
import CurrentUserApi from './currentUser';

const apiPath = 'messages/';

class MessageApi {

  static create(text, chatKey) {
    let currentUser = firebase.auth().currentUser;
    const message = {
      text,
      timestamp: (new Date()).getTime(),
      user: {
        uid: currentUser.uid,
        displayName: CurrentUserApi.getName()
      },
      chatKey
    };
    return MessageApi.getRef().push(message);
  }

  static getRef() {
    return firebase.database().ref(apiPath);
  }
}

export default MessageApi;
