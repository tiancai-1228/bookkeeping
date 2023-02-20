import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyA5NfruCxQVOlwUBX76UZF0jYQA5hurUkw',
  authDomain: 'bookeeping-96c39.firebaseapp.com',
  databaseURL: 'https://bookeeping-96c39-default-rtdb.firebaseio.com',
  projectId: 'bookeeping-96c39',
  storageBucket: 'bookeeping-96c39.appspot.com',
  messagingSenderId: '271710735407',
  appId: '1:271710735407:web:ad861347386d4f1db78ada',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };
