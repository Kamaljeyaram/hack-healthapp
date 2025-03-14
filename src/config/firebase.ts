import { initializeApp } from '@firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYQxDWHsGI9_QJZj-PwfQOXEDLJm_RKWQ",
  authDomain: "hack-auth-bd12f.firebaseapp.com",
  projectId: "hack-auth-bd12f",
  storageBucket: "hack-auth-bd12f.appspot.com",
  messagingSenderId: "1015184245778",
  appId: "1:1015184245778:web:b9a9a9b9a9a9b9a9a9a9b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;