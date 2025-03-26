// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your Firebase configuration object
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

// Initialize Firebase Authentication
const auth = getAuth(app);

// UI Elements
const authBox = document.getElementById('authBox');
const trackerTable = document.getElementById('trackerTable');
const logoutBtn = document.getElementById('logoutBtn');
const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const switchToLogin = document.getElementById('switchToLogin');
const toggleAuthText = document.getElementById('toggleAuth');

// Set up authentication state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Show movie tracker table, hide auth box
    trackerTable.style.display = 'block';
    authBox.style.display = 'none';
    logoutBtn.style.display = 'block';
  } else {
    // Show auth box, hide tracker table
    trackerTable.style.display = 'none';
    authBox.style.display = 'block';
    logoutBtn.style.display = 'none';
  }
});

// Toggle between Sign Up and Login forms
switchToLogin.addEventListener('click', () => {
  authTitle.textContent = 'Login';
  authSubmit.textContent = 'Log In';
  toggleAuthText.innerHTML = "Don't have an account? <a href='javascript:void(0);' id='switchToSignUp'>Sign Up</a>";
  const switchToSignUp = document.getElementById('switchToSignUp');
  switchToSignUp.addEventListener('click', () => {
    authTitle.textContent = 'Sign Up';
    authSubmit.textContent = 'Sign Up';
    toggleAuthText.innerHTML = "Already have an account? <a href='javascript:void(0);' id='switchToLogin'>Login</a>";
  });
});

// Sign Up Function
function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User signed up:', userCredential.user);
    })
    .catch((error) => {
      console.error('Error signing up:', error.message);
    });
}

// Sign In Function
function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User signed in:', userCredential.user);
    })
    .catch((error) => {
      console.error('Error signing in:', error.message);
    });
}

// Sign Out Function
function signOutUser() {
  signOut(auth)
    .then(() => {
      console.log('User signed out');
    })
    .catch((error) => {
      console.error('Error signing out:', error.message);
    });
}

// Handle Auth Form Submit (Login or Sign Up)
authForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (authTitle.textContent === 'Sign Up') {
    signUp(email, password);
  } else {
    signIn(email, password);
  }
});
