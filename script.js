"use strict";

// buttons
const rollBtn = document.querySelector(".btn--roll");
const newBtn = document.querySelector(".btn--new");

// to switch players
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

// player score element variables
const player0ScoreText = document.querySelector("#score--0");
const player1ScoreText = document.querySelector("#score--1");
const addToCurrent = document.querySelector(".current-score");
const currentPlayerName = document.querySelector(".current-label");

// dice elements
const dice1 = document.querySelector(".dice");
const dice2 = document.querySelector(".dice2");

// starting values for game
player0ScoreText.textContent = 0;
player1ScoreText.textContent = 0;
addToCurrent.textContent = 0;

dice1.classList.add("hidden");
dice2.classList.add("hidden");

// current player stats
let activePlayer = 0;
let currentScore = 0;
let scores = [0, 0];

// switch players
function switchPlayers() {
  // add current score to active player's score in the array
  scores[activePlayer] += currentScore;

  // reset current score after switching
  currentScore = 0;

  // display updated scores
  player0ScoreText.textContent = scores[0];
  player1ScoreText.textContent = scores[1];

  // switch the player
  activePlayer = activePlayer === 0 ? 1 : 0; // if active player is player 1 (0), switch to player 2 (1), if not then the player is player 2 (1), switch back to 0

  // player switch animation
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");

  // remove loser background
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--loser");
}

rollBtn.addEventListener("click", function () {
  // generate random dice rolls (need 2)
  const dice1Num = Math.floor(Math.random() * 6) + 1;
  const dice2Num = Math.floor(Math.random() * 6) + 1;

  dice1.src = `dice-${dice1Num}.png`;
  dice2.src = `dice-${dice2Num}.png`;

  // display dice
  dice1.classList.remove("hidden");
  dice2.classList.remove("hidden");

  // if a 7 is NOT rolled
  if (dice1Num + dice2Num !== 7) {
    let addToScore = dice1Num + dice2Num;
    currentScore += addToScore;

    currentPlayerName.textContent =
      activePlayer === 0 ? "Player 1" : "Player 2";

    addToCurrent.innerHTML = `${scores[activePlayer]} (<span class="added-score">+${addToScore}</span>)`;

    document.querySelector(`#score--${activePlayer}`).textContent =
      currentScore;
    switchPlayers();
  }

  // if a 7 is rolled
  else {
    // add loser background
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--loser");

    let addToScore = 0;
    currentScore += addToScore;

    currentPlayerName.textContent =
      activePlayer === 0 ? "Player 1" : "Player 2";
    addToCurrent.innerHTML = `${scores[activePlayer]} (<span class="added-score">+${addToScore}</span>)`;

    document.querySelector(`#score--${activePlayer}`).textContent =
      currentScore;

    switchPlayers();
  }

  // if the same digits are rolled
  if (dice1Num === dice2Num) {
    let addToScore = (dice1Num + dice2Num) * 2;
    currentScore += addToScore;

    currentPlayerName.textContent =
      activePlayer === 0 ? "Player 1" : "Player 2";
    addToCurrent.innerHTML = `${scores[activePlayer]} (<span class="added-score">+${addToScore}</span>)`;
    document.querySelector(`#score--${activePlayer}`).textContent =
      currentScore;
    switchPlayers();
  }

  // if a player reaches 100, they win the game
  if (scores[0] >= 100 || scores[1] >= 100) {
    // determine the winner by comparing the scores
    const winner = scores[0] >= 100 ? 0 : 1;

    document
      .querySelector(`.player--${winner}`)
      .classList.add("player--winner");

    swal(
      "Winner Winner 🍗 Dinner!",
      `${winner === 0 ? "Player 1" : "Player 2"} wins with a score of ${
        scores[winner]
      }`,
      "success"
    );
  }
});

// start a new game
newBtn.addEventListener("click", function () {
  // starting values for game
  player0ScoreText.textContent = 0;
  player1ScoreText.textContent = 0;
  addToCurrent.textContent = 0;

  dice1.classList.add("hidden");
  dice2.classList.add("hidden");

  // current player stats
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];

  // remove winner/loser background
  document.querySelector(`.player--0`).classList.remove("player--winner");
  document.querySelector(`.player--0`).classList.remove("player--loser");

  document.querySelector(`.player--1`).classList.remove("player--winner");
  document.querySelector(`.player--1`).classList.remove("player--loser");
});
