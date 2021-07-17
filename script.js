// DOM
const dice = document.querySelector('.dice');
const scorePlayer0 = document.querySelector('#score-0');
const scorePlayer1 = document.querySelector('#score-1');
const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');
const current0 = document.getElementById('current-0');
const current1 = document.getElementById('current-1');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

// Starting Conditions
let scores, currentScore, activePlayer, gamePlaying;

const initGame = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    scorePlayer0.textContent = 0;
    scorePlayer1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;
    
    dice.classList.add('hidden');
    player0.classList.remove('winner');
    player1.classList.remove('winner');
    player0.classList.add('active');
    player1.classList.remove('active');
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
}
initGame();

const switchPlayer = () => {
    document.getElementById(`current-${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('active');
    player1.classList.toggle('active');
}

// Event listeners
btnRoll.addEventListener('click', () => {
    if(gamePlaying) {
        let diceNum = Math.floor(Math.random() * 6) + 1;
        dice.classList.remove('hidden');
        dice.src = `img/dice-${diceNum}.png`;
    
        if(diceNum !== 1) {
            currentScore += diceNum;
            document.getElementById(`current-${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', () => {
    if(gamePlaying) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
    
        if (scores[activePlayer] > 25) {
            gamePlaying = false;
            document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
            document.querySelector(`.player-${activePlayer}`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}`).classList.remove('active');
            dice.classList.add('hidden');    
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', initGame);