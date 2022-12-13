import 'firebase/storage';

import 'firebase/firestore';

//import firebase from 'firebase/app';

import { initializeApp } from 'firebase/app';

import { getFirestore, collection, getDocs } from 'firebase/firestore';


export const firebaseConfig = {
    apiKey: "AIzaSyB-g-T0rCaPU3eR2lL9rY781FdOFWYuigU",
    authDomain: "dbprojeto-e4ff9.firebaseapp.com",
    projectId: "dbprojeto-e4ff9",
    storageBucket: "dbprojeto-e4ff9.appspot.com",
    messagingSenderId: "181046027396",
    appId: "1:181046027396:web:990b6ed9dfd78011de4ed1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
export default database

