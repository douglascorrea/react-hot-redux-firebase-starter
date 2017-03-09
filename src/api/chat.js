/**
 * Created by clementlucas on 08/03/2017.
 */
import * as firebase from 'firebase/firebase-browser';
import FirebaseApi from './firebase';

export default class ChatApi {
  static getChatRoomByName(name) {
    const ref = firebase.database().ref('chatrooms');
    return ref
      .orderByChild('name')
      .equalTo(name)
      .limitToFirst(1)
      .once('value')
      .then(res => {
        let chatroom = res.val();
        return chatroom ?
          Object.keys(chatroom).map(key => {
            return {
              id: key,
              ...chatroom[key]
            }
          })[0] : null
      });
  }

  static getChatRoomById(id) {
    return firebase.database().ref(`chatrooms/${id}`).once('value')
      .then(res => {
        console.log("getChatRoomById", res);
        return {id: res.key, ...res.val()};
      });
  }

  static createChatRoom(name) {
    return FirebaseApi.databasePushByKey('chatrooms', {
      name,
      createdAt: {".sv": "timestamp"}
    });
  }

  static streamMessages(roomId) {
    return firebase.database().ref(`chatrooms/${roomId}/messages`).limitToLast(10)
  }

  static fetchChatRooms() {
    const ref = firebase.database().ref().child('chatrooms');

    return ref.once('value')
      .then(result => {
        const rooms = result.val();
        if (!rooms) {
          return [];
        }
        return Object.keys(rooms).map((key) => {
          return {
            id: key,
            ...rooms[key]
          }
        });
      });
  }

  static connectChatRoom(name) {
    return this.getChatRoomByName(name);
  }

  static sendMessageToChatRoomById(id, message) {
    return FirebaseApi.databasePushByKey(`chatrooms/${id}/messages`, {
      message,
      createdAt: {".sv": "timestamp"}
    });
  }

}

