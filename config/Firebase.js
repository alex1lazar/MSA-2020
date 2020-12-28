import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqs914JyN4MWxxCA9UCZolwYvQLlLpsEk",
  authDomain: "rn-msaapp2020.firebaseapp.com",
  projectId: "rn-msaapp2020",
  storageBucket: "rn-msaapp2020.appspot.com",
  messagingSenderId: "550166390959",
  appId: "1:550166390959:web:2cf69608208462e3120c5a",
  measurementId: "G-DYC5VG4D2P",
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export default Firebase;
