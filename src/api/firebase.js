import { identity } from 'ramda';
import * as firebase from 'firebase/firebase-browser';
import { firebaseConfig } from '../config';

class FirebaseApi {
  static SERVER_TIMESTAMP = firebase.database.ServerValue.TIMESTAMP

  static initAuth() {
    firebase.initializeApp(firebaseConfig);
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
    return firebase
      .database()
      .ref(path)
      .push(value);
  }

  static databaseRemove(path) {
    return firebase
      .database()
      .ref(path)
      .remove();
  }

  static GetValue = async (path) => {
    const snapshot = await firebase.database().ref(path).once('value');
    return snapshot.val();
  }

  static Subscribe = (path, event, prepareQuery = identity) => emit => {
    const query = prepareQuery(firebase.database().ref(path));
    const cb = (snapshot) => {
      emit({ ...snapshot.val(), id: snapshot.key });
    };

    query.on(event, cb);

    return () => {
      query.off(event, cb);
    };
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

    return firebase
      .database()
      .ref(path)
      .set(value);

  }
}

export default FirebaseApi;
