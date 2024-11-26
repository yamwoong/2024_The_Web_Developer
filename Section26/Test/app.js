const play1 = document.querySelector('#player1');
const play2 = document.querySelector('#player2');
const reset = document.querySelector('#reset');
const score = document.querySelector('#score');
const score1 = document.querySelector('#score1');
const score2 = document.querySelector('#score2');
const scoreBoard = document.querySelector('#h1');
let i = 0;
let j = 0;
let player = '';

play1.addEventListener('click', function () {
    player = 'a';
    const play1Score = scoreUp(player);

    scoreBoard.innerText = play1Score;
})

play2.addEventListener('click', function () {
    player = 'b';
    const play2Score = scoreUp(player);

    scoreBoard.innerText = play2Score;
})

reset.addEventListener('click', function () {
    i = 0;
    j = 0;
    score.value = 5;
    play1.disabled = false;
    play2.disabled = false;
    scoreBoard.innerText = '0 To 0';

})

const scoreUp = (player) => {
    if (player === 'a' && i < score.value) {
        i++;
    } else if (player === 'b' && j < score.value) {
        j++;
    }

    if (player === 'a' && i == score.value || player === 'b' && j == score.value) {
        console.dir(scoreBoard);
        play1.disabled = true;
        play2.disabled = true;
    }
    return `${i} to ${j}`
}