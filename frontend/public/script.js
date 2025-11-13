const btn = document.getElementById("btn")
const scoreDisplay = document.getElementById("scoreDisplay")

let score = 0;
const sawasdeeFile = [
    'sawasdee/1.mp3',
    'sawasdee/4.mp3',
]

btn.addEventListener('click', async () => {
    btn.setAttribute("src", "picture/speak.png");

    const randomIndex = Math.floor(Math.random() * sawasdeeFile.length);
    console.log(randomIndex);

    const nattee = new Audio(sawasdeeFile[randomIndex]);
    nattee.play();
    score += 1;
    scoreDisplay.innerText = score;

    setTimeout(() => { btn.setAttribute("src", "picture/image.png"); }, 10);
})
