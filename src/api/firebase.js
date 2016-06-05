import * as firebase from 'firebase/firebase-browser';

class FirebaseApi {
  static databasePush(path, value) {
    return new Promise ((resolve, reject) => {
      firebase
        .database()
        .ref(path)
        .push(value, (error) => {
          if(error){
            reject(error);
          } else {
            resolve();
          }
        });
    });
  }
}

export default FirebaseApi;
