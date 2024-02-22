// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from '@firebase/auth'
import { collection, getFirestore } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAMhPQiyT8es9vMFjFjUpNFL7HVgjD5SRA',
  authDomain: 'rnchatapp-5d128.firebaseapp.com',
  projectId: 'rnchatapp-5d128',
  storageBucket: 'rnchatapp-5d128.appspot.com',
  messagingSenderId: '750033693198',
  appId: '1:750033693198:web:b93c31f3113480fda22a5f',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export const db = getFirestore(app)

export const userRef = collection(db, 'users')
export const roomRef = collection(db, 'rooms')
