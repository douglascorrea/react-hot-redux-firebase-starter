import * as firebase from 'firebase/firebase-browser';
import {firebaseConfig} from '../config';


class FirebaseApi {

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

  static databasePushMessage(path, value) {
    return new Promise((resolve, reject) => {
        let U = firebase
            .database()
            .ref(path)
            .push();
        U.set({
            messageUID : U.key,
            text : value.text,
            userUID : value.userUID,
            userEmail : value.userEmail
        })
        .then(_ => {
            resolve(U.key);
        })
        .catch(error => {
            reject(error);
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

  static GetChildAddedByOnce(path) {
    return new Promise((resolve, reject) => {
        firebase
          .database()
          .ref(path)
          .limitToLast(1)
          .on('value', (snapshot) => {
             resolve(snapshot);
          });
    });
  }

  static GetDataByKey(path, key) {
    return new Promise((resolve, reject) => {
        firebase
          .database()
          .ref(path)
          .orderByKey()
          .equalTo(key)
          .on('value', (snapshot) => {
              resolve(snapshot.val());
          });
    });

  }

  static GetChildAddedOnce(path) {
    return new Promise((resolve, reject) => {
        firebase
            .database()
            .ref(path)
            .limitToLast(10)
            .orderByKey()
            .on('value', (snapshot) => {
                resolve(snapshot.val());
            });
    });

  }

  static databaseSet(path, value) {

    return firebase
      .database()
      .ref(path)
      .set(value);

  }
}

export default FirebaseApi;
