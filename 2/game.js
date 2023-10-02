const startButton = document.querySelector('#startButton');
const endButton = document.querySelector('#endButton');
const circles = document.querySelectorAll('.circle');
const scoreDisplay = document.querySelector('.score')
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.close');
const gameOverMessageContainer = document.querySelector('#gameOverMessageContainer');
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
    if (gameRun) {
        startButton.style.display = 'none';
        endButton.style.display = 'block';
    } else {
        startButton.style.display = 'block';
        endButton.style.display = 'none';
    }
};

const startGame = () => {
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

const resetGame = () => {
    window.location.reload();
}

changeButton();


const updateGameOverMessage = (score) => {
    finalScoreDisplay.textContent = score;
    showModal(); // Show the modal with the game over message and final score
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
    clearTimeout(timer);
    updateGameOverMessage(score);
    showModal();
    resetGame;
};

startButton.addEventListener('click', startGame);
endButton.addEventListener('click', endGame);
closeButton.addEventListener('click', hideModal);





