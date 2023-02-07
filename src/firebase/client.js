import { initializeApp, getApp, getApps } from 'firebase/app'

import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID
}

// Cuando detecta muchas aplicaciones de firebase, solo obtiene una para evitar errores
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const db = getFirestore()
export const storage = getStorage()
