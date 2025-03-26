import { auth, signIn, signUp, signOutUser } from './firebase.js';

const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const authModal = document.getElementById('authModal');
const authSubmit = document.getElementById('authSubmit');
const toggleAuth = document.getElementById('toggleAuth');
const authTitle = document.getElementById('authTitle');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const movieTableBody = document.getElementById('movieTableBody');

loginBtn.addEventListener('click', () => authModal.style.display = 'block');
logoutBtn.addEventListener('click', signOutUser);

toggleAuth.addEventListener('click', () => {
  if (authTitle.textContent === 'Login') {
    authTitle.textContent = 'Sign Up';
    authSubmit.textContent = 'Sign Up';
    toggleAuth.innerHTML = 'Already have an account? <a href="#">Login</a>';
  } else {
    authTitle.textContent = 'Login';
    authSubmit.textContent = 'Log In';
    toggleAuth.innerHTML = 'Don\'t have an account? <a href="#">Sign Up</a>';
  }
});

authSubmit.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  if (authTitle.textContent === 'Sign Up') {
    signUp(email, password);
  } else {
    signIn(email, password);
  }
});

const movies = JSON.parse(localStorage.getItem('movies')) || [];

function renderMovies() {
  movieTableBody.innerHTML = '';
  movies.forEach((movie, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${movie.title}</td>
      <td>
        <input type="checkbox" ${movie.watched ? 'checked' : ''} data-index="${index}">
      </td>
    `;
    movieTableBody.appendChild(row);
  });

  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const index = e.target.dataset.index;
      movies[index].watched = e.target.checked;
      localStorage.setItem('movies', JSON.stringify(movies));
    });
  });
}

document.addEventListener('DOMContentLoaded', renderMovies);
