// index.js
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, db, ref, set, get } from './firebase.js';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const authBtn = document.getElementById('authBtn');
const signUpLink = document.getElementById('signUpLink');
const movieTracker = document.getElementById('movieTracker');
const movieTableBody = document.getElementById('movieTableBody');
const logoutBtn = document.getElementById('logoutBtn');
const authForm = document.getElementById('authForm');

// Check if user is logged in when page loads
auth.onAuthStateChanged(user => {
  if (user) {
    // User is logged in
    movieTracker.style.display = 'block';
    authForm.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    loadMovies(user);
  } else {
    // User is not logged in
    movieTracker.style.display = 'block';
    authForm.style.display = 'block';
    logoutBtn.style.display = 'none';
  }
});

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

// Show the sign-up form when the user clicks on the sign-up link
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

// Fetch and display movies for the authenticated user
async function loadMovies(user) {
  const userMoviesRef = ref(db, 'movies/' + user.uid);
  const snapshot = await get(userMoviesRef);

  if (snapshot.exists()) {
    const movies = snapshot.val();
    Object.keys(movies).forEach(movieId => {
      const movie = movies[movieId];
      const row = document.createElement('tr');
      row.innerHTML = `<td>${movie.title}</td><td>${movie.watched}</td>`;
      movieTableBody.appendChild(row);
    });
  } else {
    console.log('No movies found for this user');
  }
}
