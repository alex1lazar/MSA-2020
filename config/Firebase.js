import firebase from "firebase";
import "firebase/firestore";

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  MESSAGE_SENDER_ID,
  APP_ID,
  STORAGE_BUCKET,
} from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID,
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export default Firebase;
