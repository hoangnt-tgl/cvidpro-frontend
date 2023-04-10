// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA0j1grRpXuHYd2MSE6_CnZU8wEvw4Izq4',
  authDomain: 'cvid-da688.firebaseapp.com',
  projectId: 'cvid-da688',
  storageBucket: 'cvid-da688.appspot.com',
  messagingSenderId: '870582779703',
  appId: '1:870582779703:web:34e6e533de336f7d6124b2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };
