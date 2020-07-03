import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAmsKvhX5QSR_EPolIThWHQg6zFu3b2y0w',
  authDomain: 'links-management.firebaseapp.com',
  databaseURL: 'https://links-management.firebaseio.com',
  projectId: 'links-management',
  storageBucket: 'links-management.appspot.com',
  messagingSenderId: '185609621000',
  appId: '1:185609621000:web:10706c18fc759619f20bbd',
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

// Initialize Firestore
export const db = fb.firestore();
