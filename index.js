// index.js
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from './firebase.js';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const authBtn = document.getElementById('authBtn');
const signUpLink = document.getElementById('signUpLink');
const logoutBtn = document.getElementById('logoutBtn');
const authForm = document.getElementById('authForm');

// Listen for authentication state changes
auth.onAuthStateChanged(user => {
  if (user) {
    // User is logged in
    authForm.style.display = 'none';  // Hide the login form
    logoutBtn.style.display = 'inline-block'; // Show the logout button
  } else {
    // User is not logged in
    authForm.style.display = 'block';  // Show the login form
    logoutBtn.style.display = 'none';  // Hide the logout button
  }
});

// Handle login
authBtn.addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  if (email && password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in');
    } catch (error) {
      alert('Error signing in: ' + error.message);
    }
  }
});

// Handle sign up
signUpLink.addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  if (email && password) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up');
    } catch (error) {
      alert('Error signing up: ' + error.message);
    }
  }
});

// Log out the user
logoutBtn.addEventListener('click', async () => {
  try {
    await signOut(auth);
    console.log('User logged out');
  } catch (error) {
    console.error('Error logging out: ', error);
  }
});
