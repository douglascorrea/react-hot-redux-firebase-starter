import * as firebase from 'firebase/firebase-browser';

class FirebaseApi {
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

  static databaseGetByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once('value');
  }

  static databaseSet(path, value) {

    return firebase
      .database()
      .ref(path)
      .set(value);

  }
}

export default FirebaseApi;
