const startButton = document.querySelector('#startButton');
const endButton = document.querySelector('#endButton');
const circles = document.querySelectorAll('.circle');


console.log(circles);

const clickCircle = (i) => {
  console.log('circle was clicked', i)
}

circles.forEach((circle, i) => {
    circle.addEventListener('click', () => clickCircle(i));
})

const startGame = () => {
    console.log('game started')
}

const endGame = () => {
    console.log('game ended')
}

startButton.addEventListener('click', startGame);
endButton.addEventListener('click', endGame);
