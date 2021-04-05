import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyC_ZTCN2XbXzvW-4ltCnCl0AL4yUYPjnGY",
    authDomain: "task-app-lite.firebaseapp.com",
    projectId: "task-app-lite",
    storageBucket: "task-app-lite.appspot.com",
    messagingSenderId: "888508261648",
    appId: "1:888508261648:web:e552b83d184df08b7cb195",
    measurementId: "G-CL3Q5NJCF8"
  };
  // Initialize Firebase
 const firestore=firebase.initializeApp(firebaseConfig);
 
 export const auth=firestore.auth();
 export const provider=new firebase.auth.GoogleAuthProvider();
 export const storage=firestore.storage()
