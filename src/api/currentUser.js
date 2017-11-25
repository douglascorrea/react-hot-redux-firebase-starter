import * as firebase from 'firebase/firebase-browser';

class CurrentUserApi {

  static getName() {
    let currentUser = firebase.auth().currentUser;
    return currentUser.displayName || currentUser.email;
  }
}

export default CurrentUserApi;
