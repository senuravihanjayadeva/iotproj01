import firebase from "firebase/app";
import "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyC-8znXwV5d019phVz_t7q0g3-B_-eKY58",
  authDomain: "iotled-d5189.firebaseapp.com",
  databaseURL: "https://iotled-d5189.firebaseio.com",
  projectId: "iotled-d5189",
  storageBucket: "iotled-d5189.appspot.com",
  messagingSenderId: "1043454800573",
  appId: "1:1043454800573:web:a27c0a6be73e0353fb7dd4",
  measurementId: "G-VKKZ6MY7H3",
};
// Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();
