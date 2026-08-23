'use strict';
function log(value) {
  console.log(value);
}

/* ------ project 3: Pig game -------- */
// Elements delcaration
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

/* ---- Rolling dice ---- */
/* ----- switching the player : swp ---- */
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const Player0El = document.querySelector('.player--0');
const Player1El = document.querySelector('.player--1');

let currentScore = 0;
let activePlayer = 0; // swp
let scores = [0, 0];
let playing = true; //hs

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    log(dice);

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayers();
    }
  }
});

/* ---- holding  current score : hs---- */

function switchPlayers() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer == 0 ? 1 : 0; // swp
  Player0El.classList.toggle('player--active'); // swp
  Player1El.classList.toggle('player--active'); // swp
}

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayers();
    }
  }
});

/* ------  resetting the score-------- */
// My code
btnNew.addEventListener('click', function () {
  current0El.textContent =
    current1El.textContent =
    score0El.textContent =
    score1El.textContent =
    activePlayer =
    currentScore =
      0;
  scores = [0, 0];

  playing = true;
  if (Player0El.classList.contains('player--winner')) {
    Player0El.classList.remove('player--winner');
  }
  if (Player1El.classList.contains('player--winner')) {
    Player1El.classList.remove('player--winner');
  }
  if (!Player0El.classList.contains('player--active')) {
    Player0El.classList.add('player--active');
  }
  if (Player1El.classList.contains('player--active')) {
    Player1El.classList.remove('player--active');
  }
});
// course code
/* 
let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
btnNew.addEventListener('click', init);

*/
