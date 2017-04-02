import * as type from './actionTypes';
import firebaseAPI from  '../api/firebase';

export function messageSaved() {
  return {
    type: type.MESSAGE_SAVED
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