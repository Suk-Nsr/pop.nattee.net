const natteeBtn = document.getElementById("natteeBtn")
const scoreDisplay = document.getElementById("scoreDisplay")
const filterLeaderboardBtn = document.getElementById("filterLeaderboard")

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