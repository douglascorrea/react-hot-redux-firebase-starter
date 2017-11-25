import * as firebase from 'firebase/firebase-browser';
import CurrentUserApi from './currentUser';

const apiPath = 'chats/';

class ChatRoomApi {

  static create(chatRoom) {
    let currentUser = firebase.auth().currentUser;
    chatRoom.users = {
      [currentUser.uid]: CurrentUserApi.getName()
    };
    return this.getRef().push(chatRoom);
  }

  static leave(chat) {
    const uid = firebase.auth().currentUser.uid;
    let path = `${apiPath}/${chat.key}/users/${uid}`;
    return firebase.database().ref(path).remove();
  }

  static join(chatRoom) {
    let currentUser = firebase.auth().currentUser;
    const uid = currentUser.uid;
    let path = `${apiPath}/${chatRoom.key}/users/${uid}`;
    return firebase.database().ref(path).set(CurrentUserApi.getName());
  }

  static getRef(chatId) {
    let path = apiPath;
    if(chatId) {
      path += '/' + chatId;
    }
    return firebase.database().ref(path);
  }
}

export default ChatRoomApi;
