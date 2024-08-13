import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAcFJlmBl-UaVSAPNdM8uC48tNRGEO-bsg",
  authDomain: "timesheet-app-highbrow.firebaseapp.com",
  projectId: "timesheet-app-highbrow",
  storageBucket: "timesheet-app-highbrow.appspot.com",
  messagingSenderId: "567917206579",
  appId: "1:567917206579:web:421ff36dff48a768b3d746",
  measurementId: "G-77K2KWWHS1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  storage,
};
