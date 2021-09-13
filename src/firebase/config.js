import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAfJ9K-LykMaFYkVVhMhLWESJQKCA4kRHI',
  authDomain: 'muso-ninjas-8925c.firebaseapp.com',
  projectId: 'muso-ninjas-8925c',
  storageBucket: 'muso-ninjas-8925c.appspot.com',
  messagingSenderId: '201340495253',
  appId: '1:201340495253:web:5138619518aa64ae93829c',
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, timestamp };
