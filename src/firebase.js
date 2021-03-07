import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyCBKTparwFjjj-VMCeSAR5rDp7251-WjRY',
  authDomain: 'speed-typer-b8930.firebaseapp.com',
  databaseURL: 'https://speed-typer-b8930-default-rtdb.firebaseio.com',
  projectId: 'speed-typer-b8930',
  storageBucket: 'speed-typer-b8930.appspot.com',
  messagingSenderId: '1054037891948',
  appId: '1:1054037891948:web:38d596e71bb3f83f0cf149',
};
// Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();
