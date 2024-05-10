import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage, ref} from "firebase/storage";

const app = initializeApp({
    apiKey: process.env.REACT_FIREBASE_APIKEY,
    authDomain: process.env.REACT_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_FIREBASE_APPID
});

// @ts-ignore
export const auth = getAuth(app);
export const imageRepo = getStorage(app);
export const imagesRef = ref(imageRepo, 'images');
export default app;
