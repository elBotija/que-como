import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA_orhkGEuPRQTDPr3WXj6qMI19H6NLk7E",
  authDomain: "que-como-6b0e9.firebaseapp.com",
  databaseURL: "https://que-como-6b0e9.firebaseio.com",
  projectId: "que-como-6b0e9",
  storageBucket: "que-como-6b0e9.appspot.com",
  messagingSenderId: "202337210113",
  appId: "1:202337210113:web:d153136ccb3bb6ff72d500"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = getFirestore(app);

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => {
  console.log("Iniciando signInWithPopup");
  return auth.signInWithPopup(provider)
    .then((result) => {
      console.log("Usuario autenticado:", result.user?.uid);
      return result;
    })
    .catch((error) => {
      console.error("Error en signInWithPopup:", error);
      throw error;
    });
};

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    console.log("Persistencia configurada como LOCAL");
  })
  .catch((error) => {
    console.error("Error al configurar la persistencia:", error);
  });

export default firebase;