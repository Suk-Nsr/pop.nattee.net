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
let filter = 'All';
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

function handleClickNatteeDown(event) {
    
    if (!event.repeat && formContainer.style.display === 'none') {
        natteeBtn.setAttribute("src", "picture/speak.png");

        const randomIndex = Math.floor(Math.random() * sawasdeeFile.length);
        //console.log(randomIndex);

        const aud = new Audio(sawasdeeFile[randomIndex]);
        aud.play();
        score += 1;
        scoreDisplay.innerText = score;
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

    if (filter === 'All') {
        filter = 'Student';
        filterLeaderboardBtn.innerHTML = 'Student';
        filterLeaderboardBtn.style.backgroundColor = 'green';
    }

    else if (filter == 'Student') {
        filter = 'Teacher';
        filterLeaderboardBtn.innerHTML = 'Teacher';
        filterLeaderboardBtn.style.backgroundColor = 'blue';
    }

    else if (filter == 'Teacher') {
        filter = 'All';
        filterLeaderboardBtn.innerHTML = 'All';
        filterLeaderboardBtn.style.backgroundColor = 'purple';
    }

    console.log(filter);
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
}

