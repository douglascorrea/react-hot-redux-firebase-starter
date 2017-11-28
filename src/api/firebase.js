import * as firebase from 'firebase/firebase-browser';

class FirebaseApi {
  static initAuth() {
    return new Promise((resolve, reject) => {
      const unsub = firebase.auth().onAuthStateChanged(
        user => {
          unsub();
          resolve(user);
        },
        error => reject(error)
      );
    });
  }

  static createUserWithEmailAndPassword(user){
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
  }

  static signInWithEmailAndPassword(user) {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  }

  static authSignOut(){
    return firebase.auth().signOut();
  }

  static databasePush(path, value) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(path)
        .push(value, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
    });
  }

  static GetValueByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once('value');
  }

  static GetChildAddedByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once('child_added');
  }

  static databaseSet(path, value) {
    return firebase.database().ref(path).set(value);
  }

  static unsubDatabase(path) {
    return firebase.database().ref(path).off();
  }

  static databasePathValueLimitToLast(path, limit, handler) {
    return firebase
      .database()
      .ref(path)
      .limitToLast(limit)
      .on('value', handler);
  }
}

export default FirebaseApi;
