const btn = document.getElementById("btn")
const scoreDisplay = document.getElementById("scoreDisplay")

let score = 0;
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

btn.addEventListener('mousedown', async () => {
    btn.setAttribute("src", "picture/speak.png");

    const randomIndex = Math.floor(Math.random() * sawasdeeFile.length);
    console.log(randomIndex);

    const nattee = new Audio(sawasdeeFile[randomIndex]);
    nattee.play();
    score += 1;
    scoreDisplay.innerText = score;
})

btn.addEventListener("mouseup", () => {
    btn.setAttribute("src", "picture/image.png")
})
