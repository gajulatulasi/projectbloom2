import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyASE3m_6xZouIYCxN4_B3yI5yOLUrN7v48",
  authDomain: "learning-management-syst-b0dbc.firebaseapp.com",
  projectId: "learning-management-syst-b0dbc",
  storageBucket: "learning-management-syst-b0dbc.firebasestorage.app",
  messagingSenderId: "35356084384",
  appId: "1:35356084384:web:717cd91da00d030a35a1c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;