import * as type from './actionTypes';
import firebaseAPI from  '../api/firebase';

export function messageSaved() {
  return {
    type: type.MESSAGE_SAVED
  };
}

export function messageReceived(messages) {
  return {
    type: type.MESSAGE_RECEIVED,
    messages
  };
}

export function broadcastListening() {
  return {
    type: type.BROADCAST_LISTENING
  };
}



export function sendMessage(message) {
  return (dispatch, getState) => {
    firebaseAPI.databasePush("message", message)
    .then(
      () => {
        dispatch(messageSaved());
      })
    .catch(
      err => {
        throw(err);
      });
  };
}

export function listenBroadcast() {
  return (dispatch, getState) => {
    dispatch(broadcastListening());
    firebaseAPI.GetLastTen("message", function(snapshot) {
      dispatch(messageReceived(snapshot.val()));
    });
  };
}
