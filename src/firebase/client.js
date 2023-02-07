import { initializeApp, getApp, getApps } from 'firebase/app'

import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.PUBLIC_NEXT_APIKEY,
  authDomain: process.env.PUBLIC_NEXT_AUTHDOMAIN,
  projectId: process.env.PUBLIC_NEXT_PROJECTID,
  storageBucket: process.env.PUBLIC_NEXT_STORAGEBUCKET,
  messagingSenderId: process.env.PUBLIC_NEXT_MESSAGINGSENDERID,
  appId: process.env.PUBLIC_NEXT_APPID
}

// Cuando detecta muchas aplicaciones de firebase, solo obtiene una para evitar errores
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const db = getFirestore()
export const storage = getStorage()
