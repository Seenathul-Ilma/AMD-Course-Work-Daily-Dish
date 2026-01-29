import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage"
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDNPyG8s3i687AJjQdoKDMnxZN6ozlsXEc",
  authDomain: "daily-dish-354cf.firebaseapp.com",
  projectId: "daily-dish-354cf",
  storageBucket: "daily-dish-354cf.firebasestorage.app",
  messagingSenderId: "182764042558",
  appId: "1:182764042558:web:1fc8fa76ba8cc1ecd4146f"
};

const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)
