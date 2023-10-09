const startButton = document.querySelector('#startButton');
const endButton = document.querySelector('#endButton');
const circles = document.querySelectorAll('.circle');
const scoreDisplay = document.querySelector('.score')
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.close');
const gameOverMessage = document.querySelector('#gameOverMessage');
const finalScoreDisplay = document.querySelector('#finalScore');
const messageForScoreDisplay = document.querySelector('#messageForScore');

let soundEat = new Audio('eating.mp3');
soundEat.volume = 0.5;
let soundEnd = new Audio('sound.mp3');
soundEnd.volume = 0.5;
let soundSteps = new Audio('footsteps.mp3');
soundSteps

let score = 0;
let timer;
let pace = 1000;
let active = 0;
let rounds = 0;
let gameRun = false;

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

console.log(getRandomInteger(0, 3));

const enableEvents = () => {
    circles.forEach(circle => {
        circle.style.pointerEvents = "auto";
    })
}

const disableEvents = () => {
    circles.forEach(circle => {
        circle.style.pointerEvents = "none";
    });
}

// count iterations of clicks, if click !== active button 

clickPlay = () => {
    if (soundEat.paused) {
        soundEat.play();
    } else {
        soundEat.currentTime = 0;
    }
};

const clickCircle = (i) => {
    clickPlay();

    if (i !== active) {
        return endGame();
    }
    rounds--;
    score += 10;
    scoreDisplay.textContent = score;
}

// count circle
circles.forEach((circle, i) => {
    circle.addEventListener('click', () => clickCircle(i));
})

// the function sets the correct button visibility
const changeButton = () => {
    if (gameRun) {
        startButton.style.display = 'none';
        endButton.style.display = 'block';
    } else {
        startButton.style.display = 'block';
        endButton.style.display = 'none';
    }
};

const startGame = () => {
    soundSteps.play();
    // startButton.classList.toggle("hidden");
    // endButton.classList.toggle("hidden");

    if (rounds >= 3) {
        return endGame();
    }

    gameRun = true;
    changeButton();

    enableEvents();

    const newActive = pickNew(active);

    circles[newActive].classList.toggle('active');
    circles[active].classList.remove('active');

    active = newActive;
    timer = setTimeout(startGame, pace);
    pace -= 10;
    rounds ++;

    function pickNew(active) {
        const newActive = getRandomInteger(0,3);
        if (newActive !== active) {
            return newActive;
        }
        return pickNew(active);
    }
    console.log(newActive);
}

// const resetGame = () => {
//     enableEvents();
//     gameRun = false;
//     updateButtonVisibility();
//     clearTimeout(timer);
//     score = 0;
//     rounds = 0;
//     pace = 1000;
//     active = 0;
//     scoreDisplay.textContent = score;
//     gameOverMessage.style.display = 'none';
// };
const resetGame = () => {
    window.location.reload();
}

const updateGameOverMessage = (score) => {
    finalScoreDisplay.textContent = score;
    if (score >= 0 && score <= 50) {
        messageForScoreDisplay.innerHTML = 'You are still hungry!(</br> Try again';
    } else if (score > 50 && score < 100) {
        messageForScoreDisplay.innerHTML = 'Ok, better!</br> There are still a lot of berries in the forest!';
    } else if (score >= 100) {
        messageForScoreDisplay.innerHTML = 'You are a master!</br> Time for winter sleeping!';
    }
    gameOverMessage.style.display = 'block';
    showModal();
}

const showModal = () => {
    overlay.classList.add('visible');
    soundEat.pause();
    soundEnd.play();
}

const hideModal = () => {
    overlay.classList.remove('visible');
};
const endGame = () => {
    console.log('game ended');
    gameRun = false;
    changeButton();
    disableEvents();
    clearTimeout(timer);
    updateGameOverMessage(score);
    showModal();
    soundSteps.pause();
    // resetGame();
}

startButton.addEventListener('click', startGame);
endButton.addEventListener('click', endGame);
// closeButton.addEventListener('click', () => {
//     hideModal();
//     enableEvents();
// });

closeButton.addEventListener('click', resetGame);