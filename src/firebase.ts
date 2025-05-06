import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrHo68ttJwI5G0V-Fj2TxlFWySUuwnh18",
  authDomain: "dairy-daily-4ea7d.firebaseapp.com",
  projectId: "dairy-daily-4ea7d",
  storageBucket: "dairy-daily-4ea7d.appspot.com",
  messagingSenderId: "1075413874250",
  appId: "1:1075413874250:web:9bf6312828e6e420c518b3",
  measurementId: "G-C6QXLVS08Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
