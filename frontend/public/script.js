const natteeBtn = document.getElementById("natteeBtn")
const scoreDisplay = document.getElementById("scoreDisplay")
const filterLeaderboardBtn = document.getElementById("filterLeaderboard")

let score = 0;
let filter = 'All';
const sawasdeeFile = [
    'sawasdee/1.mp3',
    'sawasdee/4.mp3',
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
function handleChangeMode(event) {
    if
}