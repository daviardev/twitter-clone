import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.PUBLIC_NEXT_APIKEY,
  authDomain: process.env.PUBLIC_NEXT_AUTHDOMAIN,
  projectId: process.env.PUBLIC_NEXT_PROJECTID,
  storageBucket: process.env.PUBLIC_NEXT_STORAGEBUCKET,
  messagingSenderId: process.env.PUBLIC_NEXT_MESSAGINGSENDERID,
  appId: process.env.PUBLIC_NEXT_APPID
}

const app = initializeApp(firebaseConfig)
