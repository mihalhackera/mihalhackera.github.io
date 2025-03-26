// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZdmE3zm6o9DtEzszi7MKrGANfnq09OmU",
  authDomain: "movie-tracker-fb315.firebaseapp.com",
  projectId: "movie-tracker-fb315",
  storageBucket: "movie-tracker-fb315.firebasestorage.app",
  messagingSenderId: "947600616325",
  appId: "1:947600616325:web:964417033382fd54d2f2ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// UI Elements
const authBox = document.getElementById('authBox');
const logoutBtn = document.getElementById('logoutBtn');

// Authentication state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    authBox.style.display = 'none';
    logoutBtn.style.display = 'block';
  } else {
    authBox.style.display = 'none'; // Only show login if user clicks
    logoutBtn.style.display = 'none';
  }
});

// Sign Up Function
function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password).catch(error => alert(error.message));
}

// Sign In Function
function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password).catch(error => alert(error.message));
}

// Sign Out Function
function signOutUser() {
  signOut(auth).catch(error => alert(error.message));
}

// Export functions
export { auth, signIn, signUp, signOutUser };
