import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyArEc9h1Ozd2Wvx9JfCSrAr9514ZIM2USQ",
    authDomain: "panda-2de27.firebaseapp.com",
    databaseURL: "https://panda-2de27.firebaseio.com",
    projectId: "panda-2de27",
    storageBucket: "panda-2de27.appspot.com",
    messagingSenderId: "276271519182",
    appId: "1:276271519182:web:faf9d7e180152afdeb479f",
    measurementId: "G-G4RXDVV070"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export { db };