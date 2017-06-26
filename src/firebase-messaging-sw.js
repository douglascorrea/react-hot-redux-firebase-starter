importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '482880994460'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(message) {
  console.log('[firebase-messaging-sw.js] Received background message ', message);

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});
