const startButton = document.querySelector('#startButton');
const endButton = document.querySelector('#endButton');
const circles = document.querySelectorAll('.circle');
const scoreDisplay = document.querySelector('.score')
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.close');
const gameOverMessage = document.querySelector('#gameOverMessage');
const finalScoreDisplay = document.querySelector('#finalScore');


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

const clickCircle = (i) => {
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
 /*    if (gameRun) {
        startButton.style.display = 'none';
        endButton.style.display = 'block';
    } else {
        startButton.style.display = 'block';
        endButton.style.display = 'none';
    } */
    
};

const startGame = () => {
    startButton.classList.toggle("hidden");
    endButton.classList.toggle("hidden");

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
    gameOverMessage.style.display = 'block';
    showModal();
}

const showModal = () => {
    overlay.classList.add('visible');
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
    // resetGame();
}

startButton.addEventListener('click', startGame);
endButton.addEventListener('click', endGame);
// closeButton.addEventListener('click', () => {
//     hideModal();
//     enableEvents();
// });

closeButton.addEventListener('click', resetGame);




