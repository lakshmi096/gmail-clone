import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDx5nWUrQ3fvO4QZP72QIaOlOmXy7uJHS8",
    authDomain: "clone-5b3ab.firebaseapp.com",
    projectId: "clone-5b3ab",
    storageBucket: "clone-5b3ab.appspot.com",
    messagingSenderId: "148657419552",
    appId: "1:148657419552:web:cb0088ef581c501674d345",
    measurementId: "G-J68LZTGEXH"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider}