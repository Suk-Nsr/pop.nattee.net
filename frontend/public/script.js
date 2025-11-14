const natteeBtn = document.getElementById("natteeBtn");
const scoreDisplay = document.getElementById("scoreDisplay");
const filterLeaderboardBtn = document.getElementById("filterLeaderboard");
const showLeaderBoardBtn = document.getElementById("upDownArrow");
const leaderBoardFrame = document.getElementById("leaderboardFrame");

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
    natteeBtn.setAttribute("src", "picture/speak.png");

    const randomIndex = Math.floor(Math.random() * sawasdeeFile.length);
    //console.log(randomIndex);

    const aud = new Audio(sawasdeeFile[randomIndex]);
    aud.play();
    score += 1;
    scoreDisplay.innerText = score;
};

function handleClickNatteeUp(event) {
    natteeBtn.setAttribute("src", "picture/image.png");
};

natteeBtn.addEventListener('mousedown', () => handleClickNatteeDown(), false);
document.addEventListener('keydown', () => handleClickNatteeDown(), false);
natteeBtn.addEventListener('touchstart', () => handleClickNatteeDown(), false);

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
