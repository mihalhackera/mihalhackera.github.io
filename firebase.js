import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZdmE3zm6o9DtEzszi7MKrGANfnq09OmU",
  authDomain: "movie-tracker-fb315.firebaseapp.com",
  projectId: "movie-tracker-fb315",
  storageBucket: "movie-tracker-fb315.appspot.com",
  messagingSenderId: "947600616325",
  appId: "1:947600616325:web:964417033382fd54d2f2ec"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => console.log('Signed in'))
    .catch((error) => alert('Error signing in: ' + error.message));
}

export function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => console.log('User signed up'))
    .catch((error) => alert('Error signing up: ' + error.message));
}

export function signOutUser() {
  signOut(auth)
    .then(() => console.log('Signed out'))
    .catch((error) => alert('Error signing out: ' + error.message));
}

onAuthStateChanged(auth, (user) => {
  document.getElementById('loginBtn').style.display = user ? 'none' : 'block';
  document.getElementById('logoutBtn').style.display = user ? 'block' : 'none';
});
