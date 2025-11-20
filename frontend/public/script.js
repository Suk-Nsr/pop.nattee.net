const API_BASE_URL = "https://pop-nattee-net-backend.onrender.com/api";

const natteeBtn = document.getElementById("natteeBtn");
const scoreDisplay = document.getElementById("scoreDisplay");
const filterLeaderboardBtn = document.getElementById("filterLeaderboard");
const showLeaderBoardBtn = document.getElementById("upDownArrow");
const leaderBoardFrame = document.getElementById("leaderboardFrame");
const headerLoginButton = document.getElementById("loginHeader");
const formContainer = document.getElementById("formContainer");
const screen = document.getElementById("screen");
const loginError = document.getElementById("loginError");
const createAccountError = document.getElementById("createAccountError");

let score = 0;
let filter = "all";
let leaderboardUpdateTimer;

const sawasdeeFile = [
  'sawasdee/1.mp3',
  'sawasdee/2.mp3',
  'sawasdee/3.mp3',
  'sawasdee/4.mp3',
  'sawasdee/5.mp3',
  'sawasdee/6.mp3',
  'sawasdee/7.mp3',
  'sawasdee/8.mp3',
  'sawasdee/9.mp3',
  'sawasdee/10.mp3',
  'sawasdee/11.mp3',
  'sawasdee/12.mp3',
  'sawasdee/13.mp3',
  'sawasdee/14.mp3',
  'sawasdee/15.mp3',
  'sawasdee/16.mp3',
  'sawasdee/17.mp3',
  'sawasdee/18.mp3',
]

//CLICK NATTEE

function updateLeaderboard() {
  fetchLeaderboard(filter);
}

function startLeaderboardTimer() {
  updateLeaderboard();
  leaderboardUpdateTimer = setInterval(updateLeaderboard, 10000); // Update every 10 seconds
}

let lastTouchTime = 0; // timestamp to avoid duplicate touch->mouse events on mobile

function handleClickNatteeDown(event) {
  if (isDeleteModalOpen()) return;
  // Ignore repeated keydown events
  if (event.type === 'keydown' && event.repeat) return;

  // If a touchstart just occurred, ignore the synthetic mousedown that follows
  if (event.type === 'mousedown' && (Date.now() - lastTouchTime) < 600) return;

  // Mark the time of a real touchstart so following mouse events are ignored
  if (event.type === 'touchstart') {
    if (event.cancelable) event.preventDefault();
    lastTouchTime = Date.now();
  }

  if (formContainer.style.display === 'none') {
    natteeBtn.setAttribute("src", "picture/speak.png");

    const randomIndex = Math.floor(Math.random() * sawasdeeFile.length);

    const aud = new Audio(sawasdeeFile[randomIndex]);
    aud.play();
    score += 1;
    scoreDisplay.innerText = score;

    saveScore();
  }

};

function handleClickNatteeUp(event) {
  natteeBtn.setAttribute("src", "picture/image.png");
};

natteeBtn.addEventListener('mousedown', (event) => handleClickNatteeDown(event), false);
document.addEventListener('keydown', (event) => handleClickNatteeDown(event), false);
natteeBtn.addEventListener('touchstart', (event) => handleClickNatteeDown(event), false);

natteeBtn.addEventListener('mouseup', () => handleClickNatteeUp(), false);
document.addEventListener('keyup', () => handleClickNatteeUp(), false);
natteeBtn.addEventListener('touchend', () => handleClickNatteeUp(), false);

//FILTER LEADERBOARD

function handleFilterLeaderboard() {

  if (filter == "all") {
    filter = "student";
    filterLeaderboardBtn.innerHTML = 'Student';
    filterLeaderboardBtn.style.backgroundColor = 'green';
  }

  else if (filter == "student") {
    filter = "teacher";
    filterLeaderboardBtn.innerHTML = 'Teacher';
    filterLeaderboardBtn.style.backgroundColor = 'blue';
  }

  else if (filter == "teacher") {
    filter = "all";
    filterLeaderboardBtn.innerHTML = 'All';
    filterLeaderboardBtn.style.backgroundColor = 'purple';
  }

  fetchLeaderboard(filter);
}

filterLeaderboardBtn.addEventListener('click', () => handleFilterLeaderboard(), false)

//SHOW / HIDE LEADERBOARD

function handleShowLeaderBoard() {
  if (leaderBoardFrame.style.display === 'none') {
    leaderBoardFrame.style.display = 'block';
    showLeaderBoardBtn.innerHTML = '&#x21e9;';
  }

  else {
    leaderBoardFrame.style.display = 'none';
    showLeaderBoardBtn.innerHTML = '&#x21e7;';
  }
}

showLeaderBoardBtn.addEventListener("click", () => handleShowLeaderBoard());

//LOGIN FORM
function showForm2() {
  formContainer.style.display = 'block';
  screen.style.display = 'block';
}

headerLoginButton.addEventListener('click', () => showForm2());

function showForm(formType) {
  const loginForm = document.getElementById('login-form');
  const createForm = document.getElementById('create-account-form');

  if (formType === 'login') {
    loginForm.style.display = 'block';
    createForm.style.display = 'none';
  } else if (formType === 'create') {
    loginForm.style.display = 'none';
    createForm.style.display = 'block';
  }
}

function closeForm() {
  formContainer.style.display = 'none';
  screen.style.display = 'none';

  document.getElementById("login-username").innerHTML = "";
  document.getElementById("login-password").innerHTML = "";
  document.getElementById("create-username").innerHTML = "";
  document.getElementById("create-password").innerHTML = "";
  document.getElementById("re-enter-password").innerHTML = "";
}


//LINK TO BACKEND

// Store JWT token in localStorage
let authToken = localStorage.getItem("authToken");
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// Login function
async function loginUser(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      loginError.style.display = "block";
      return false;
    }

    authToken = data.token;
    currentUser = data.user;
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    loginError.style.display = "none";
    closeForm();
    updateLoginHeader();
    setScoreFromUser();

    return true;
  } catch (err) {
    console.error("Login error:", err);
    loginError.style.display = "block";
    return false;
  }
}

// Register function
async function registerUser(username, password, role) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role })
    });

    const data = await response.json();

    if (!response.ok) {
      createAccountError.style.display = "block";
      return false;
    }

    authToken = data.token;
    currentUser = data.user;
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    createAccountError.style.display = "none";
    closeForm();
    updateLoginHeader();
    setScoreFromUser();
    return true;
  } catch (err) {
    console.error("Register error:", err);
    createAccountError.style.display = "block";
    return false;
  }
}

//Set score from logged-in user
function setScoreFromUser() {
  if (currentUser && typeof currentUser.bestScore === "number") {
    score = currentUser.bestScore;
  } else {
    score = 0;
  }
  if (scoreDisplay) scoreDisplay.innerText = score;
}

// Logout function
function logoutUser() {
  authToken = null;
  currentUser = null;
  localStorage.removeItem("authToken");
  localStorage.removeItem("currentUser");
  score = 0;
  scoreDisplay.innerText = score;
  updateLoginHeader();
}

document.getElementById("deleteAccountHeader").addEventListener("click", () => {
  if (!currentUser || !authToken) {
    alert("Not logged in.");
    return;
  }
  document.getElementById("deleteAccountPassword").value = "";
  document.getElementById("deleteAccountError").style.display = "none";
  document.getElementById("deleteAccountOverlay").style.display = "block";
  document.getElementById("deleteAccountModal").style.display = "block";
});

function isDeleteModalOpen() {
  return document.getElementById("deleteAccountModal").style.display === "block";
}

// Confirm deletion
document.getElementById("delete-account-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const password = document.getElementById("deleteAccountPassword").value;
  if (!password) {
    document.getElementById("deleteAccountError").textContent = "Please enter your password.";
    document.getElementById("deleteAccountError").style.display = "block";
    return;
  }
  if (!confirm("This will permanently delete your account. Continue?")) return;

  try {
    const resp = await fetch(`${API_BASE_URL}/users/me`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({ password })
    });

    const data = await resp.json();

    if (!resp.ok) {
      document.getElementById("deleteAccountError").textContent = data?.error || "Failed to delete account";
      document.getElementById("deleteAccountError").style.display = "block";
      return;
    }

    alert("Account deleted successfully.");
    logoutUser();
    document.getElementById("deleteAccountModal").style.display = "none";
    document.getElementById("deleteAccountOverlay").style.display = "none";
  } catch (err) {
    document.getElementById("deleteAccountError").textContent = "Error deleting account";
    document.getElementById("deleteAccountError").style.display = "block";
  }
});

// Cancel deletion
document.getElementById("cancelDeleteAccountBtn").addEventListener("click", () => {
  document.getElementById("deleteAccountModal").style.display = "none";
  document.getElementById("deleteAccountOverlay").style.display = "none";
});

// Update login/logout header
function updateLoginHeader() {
  const loginHeader = document.getElementById("loginHeader");
  const logoutHeader = document.getElementById("logoutHeader");
  const deleteAccountHeader = document.getElementById("deleteAccountHeader");
  const usernameBox = document.getElementById("usernameBox");

  if (currentUser) {
    loginHeader.style.display = "none";
    usernameBox.style.display = "flex";
    deleteAccountHeader.style.display = "inline-block";
    //logoutHeader.style.display = "block";
    //if (usernameBox) usernameBox.innerHTML = "&#10149; " + currentUser.username;
    logoutHeader.innerHTML = "&#10149; " + currentUser.username;
  } else {
    loginHeader.style.display = "block";
    usernameBox.style.display = "none";
    deleteAccountHeader.style.display = "none";
    //logoutHeader.style.display = "none";
    //if (usernameBox) usernameBox.innerHTML = "";
    logoutHeader.innerHTML = "";
  }
}

// Save score to backend
async function saveScore() {
  if (!authToken) {
    console.log("Not logged in, score not saved");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({ score })
    });

    const data = await response.json();
    console.log("Score saved:", data);
  } catch (err) {
    console.error("Error saving score:", err);
  }
}

// Fetch leaderboard
async function fetchLeaderboard(roleFilter) {
  try {
    const url = roleFilter === "All"
      ? `${API_BASE_URL}/leaderboard`
      : `${API_BASE_URL}/leaderboard?role=${roleFilter}`;

    const response = await fetch(url);
    const users = await response.json();

    displayLeaderboard(users);
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
  }
}

// Display leaderboard data
function displayLeaderboard(users) {
  const leaderboardBody = document.getElementById("leaderboard");
  leaderboardBody.innerHTML = "";

  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.username}</td>
      <td>${user.bestScore}</td>
    `;
    leaderboardBody.appendChild(row);
  });
}

// Add this after the existing code
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  await loginUser(username, password);
});

document.getElementById("create-account-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("create-username").value;
  const password = document.getElementById("create-password").value;
  const rePassword = document.getElementById("re-enter-password").value;
  const role = document.getElementById("account-type").value;

  if (password !== rePassword) {
    createAccountError.style.display = "block";
    return;
  }

  await registerUser(username, password, role);
});

// Add logout handler
document.getElementById("logoutHeader").addEventListener("click", logoutUser);

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  updateLoginHeader();
  setScoreFromUser();

  // If a user is already logged in (saved in localStorage), populate username and score in the UI
  if (currentUser) {
    updateLoginHeader();
    setScoreFromUser();
    if (scoreDisplay) scoreDisplay.innerHTML = currentUser.bestScore;
} else {
    showForm2();
}

  startLeaderboardTimer();
  
});