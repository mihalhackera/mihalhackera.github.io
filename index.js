import { auth, signIn, signUp, signOutUser } from './firebase.js';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const authBtn = document.getElementById('authBtn');
const logoutBtn = document.getElementById('logoutBtn');
const authBox = document.getElementById('authBox');
const authSubmit = document.getElementById('authSubmit');
const switchAuth = document.getElementById('switchAuth');
const authTitle = document.getElementById('authTitle');

// Toggle Auth Modal
authBtn.addEventListener('click', () => authBox.style.display = 'block');

// Handle Login/Signup Toggle
switchAuth.addEventListener('click', () => {
  if (authTitle.textContent === 'Login') {
    authTitle.textContent = 'Sign Up';
    authSubmit.textContent = 'Sign Up';
    switchAuth.textContent = 'Login';
  } else {
    authTitle.textContent = 'Login';
    authSubmit.textContent = 'Log In';
    switchAuth.textContent = 'Sign Up';
  }
});

// Handle Auth Submission
authSubmit.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  if (authTitle.textContent === 'Sign Up') {
    signUp(email, password);
  } else {
    signIn(email, password);
  }
});

// Handle Logout
logoutBtn.addEventListener('click', signOutUser);
