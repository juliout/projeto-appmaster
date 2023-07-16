import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
//aqui abaixo vão as configurações do firebase, não é certo eu por aqui, mas como é para um teste, eu não me preocupei com isso. desculpe;
const firebaseConfig = {
   apiKey: 'AIzaSyApsuG51gmELzPC9O6xcOZuxEj4QzP-Eg0',
   authDomain: 'app-master-3bc7f.firebaseapp.com',
   projectId: 'app-master-3bc7f',
   storageBucket: 'app-master-3bc7f.appspot.com',
   messagingSenderId: '129940435410',
   appId: '1:129940435410:web:9ef350c8bd37fdcc8d180b',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
