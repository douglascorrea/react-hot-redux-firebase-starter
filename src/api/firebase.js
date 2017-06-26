import * as firebase from 'firebase/firebase-browser';
import {firebaseConfig} from '../config';

class FirebaseApi {

  static initAuth() {
    this.app = firebase.initializeApp(firebaseConfig);
    this.firebaseMessaging = this.app.messaging(this.app);

    this.firebaseMessaging.onTokenRefresh(function() {
      ctx.firebaseMessaging.getToken()
      .then(token => {
        console.log(token);
        this.fcmToken = token;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'key=AIzaSyB3YIy9OwX6CAaIFTqTVe8cTgtVUtkphxM');
        let option = {
          method: 'POST',
          headers: headers
        };

        fetch("https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/ChatX", option).then(function(response) {
          if (response.ok) {
            console.log("Subscribed to topic");
          }
        })
        .catch(function(error) {
          console.log("Error subscribing to topic:", error);
        });

      })
      .catch(function(err) {
        console.log('Unable to retrieve refreshed token ', err);
      });
    });
    this.initCloudNotifications();
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

  static initCloudNotifications() {
    this.firebaseMessaging.requestPermission()
    .then(() => {
      console.log('Notification permission granted.');
      this.firebaseMessaging.getToken()
      .then(token => {
        console.log(token);
        this.fcmToken = token;

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'key=AIzaSyB3YIy9OwX6CAaIFTqTVe8cTgtVUtkphxM');
        let option = {
          method: 'POST',
          headers: headers
        };

        fetch("https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/ChatX", option).then(function(response) {
          if (response.ok) {
            console.log("Subscribed to topic");
          }
        })
        .catch(function(error) {
          console.log("Error subscribing to topic:", error);
        });
      })
      .catch(function(err) {
        console.error('Unable to retrieve refreshed token ', err);
      });
    })
    .catch(function(err) {
      console.log('Unable to get permission to notify.', err);
    });
  }

  static sendMessage(message) {
    let headers = new Headers();

    let sender = firebase.auth().currentUser

    firebase.database().ref('messages/').push({
    author: sender.email,
    msg: message
  });



    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'key=AIzaSyB3YIy9OwX6CAaIFTqTVe8cTgtVUtkphxM');
    let option = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ notification: {
          title: "ChatX-Notification-NewMessage",
          body: message
        },
        to : "/topics/ChatX"
      })
    };

    fetch("https://fcm.googleapis.com/fcm/send", option).then(function(response) {
      if (response.ok) {
        console.log("Message sent");
      }
    })
    .catch(function(error) {
      console.log("Error subscribing to topic:", error);
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

    return firebase
      .database()
      .ref(path)
      .set(value);

  }
}

export default FirebaseApi;
