importScripts(
  "https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBG5Zq9vasnZKY7euemNAqJSL8Meh3QKys",
  authDomain: "egrocer-1431f.firebaseapp.com",
  projectId: "egrocer-1431f",
  storageBucket: "egrocer-1431f.firebasestorage.app",
  messagingSenderId: "557892105193",
  appId: "1:557892105193:web:5b4ab279c8a22079ed1178",
  measurementId: "G-DN9F5VQ17X",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
