import firebaseApi from '../api/firebase';

export function getChatRoom() {
  return firebaseApi.getChatRoom();
}

export function sendMessageToRoom(msg) {
  return firebaseApi.sendMessageToRoom(msg);
}

export function getChatRoomMessages() {
  return firebaseApi.getChatRoomMessages();
}
