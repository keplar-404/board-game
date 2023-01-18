"use strict";

const dice = document.querySelector(".dice");
// * player 1
// current--0 = current score of player 1
// current-score id = current--0
const player1StoreScore = document.getElementById("score--0");
const playe1Active = document.querySelector(".player--0");
// * player 2
// current--1 = current score of player 2
// current-score id="current--1
const player2StoreScore = document.getElementById("score--1");
const playe2Active = document.querySelector(".player--1");

// *btn
const btn__new = document.querySelector(".btn--new");
const btn__roll = document.querySelector(".btn--roll");
const btn__hold = document.querySelector(".btn--hold");

// todo setting default valiue
dice.classList.add("hidden");
player1StoreScore.textContent = 0;
player2StoreScore.textContent = 0;
let CurrentScore = 0;
let currentActivePLayer = 0;
let scores = [0, 0];
// ? This value is checking is the current player is winner.
let winnerChecking = true;

// ! Player switching function
const playerSwitching = function () {
  // setting current Active PLayer score
  document.getElementById(`current--${currentActivePLayer}`).textContent = 0;
  CurrentScore = 0;
  // switching player
  currentActivePLayer = currentActivePLayer === 0 ? 1 : 0;
  playe1Active.classList.toggle("player--active");
  playe2Active.classList.toggle("player--active");
};

//!  dice rolling functionality
btn__roll.addEventListener("click", function () {
  if (winnerChecking) {
    // ? 1. generating random number
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    console.log("This is the random number " + randomNumber);

    // ? 2. setting up dice according to random number
    dice.classList.remove("hidden");
    dice.src = `dice-${randomNumber}.png`;

    // ? setting up and storing and plusing radom number in currant score // setting up  currant score = 0 and switching player2
    if (randomNumber !== 1) {
      //  storing number in  CurrentScore dynamicaly
      CurrentScore += randomNumber;
      document.getElementById(`current--${currentActivePLayer}`).textContent =
        CurrentScore;
    } else {
      playerSwitching();
    }
  }
});

// !  Hold button
btn__hold.addEventListener("click", function () {
  if (winnerChecking) {
    // 1. storing current score in  player  Store Score section
    scores[currentActivePLayer] += CurrentScore;
    // 2. showing player Store Score
    document.getElementById(`score--${currentActivePLayer}`).textContent =
      scores[currentActivePLayer];
    // setting current Active PLayer score
    document.getElementById(`current--${currentActivePLayer}`).textContent = 0;
    CurrentScore = 0;
  }
  // 3. showing winner
  if (scores[currentActivePLayer] >= 20) {
    document
      .querySelector(`.player--${currentActivePLayer}`)
      .classList.add("player--winner");
    dice.classList.add("hidden");
    winnerChecking = false;
  } else {
    // switching player
    playerSwitching();
  }
});

// ! Reset game
btn__new.addEventListener("click", function () {
  if (currentActivePLayer === 1) {
    playe1Active.classList.toggle("player--active");
    playe2Active.classList.toggle("player--active");
  }
  player1StoreScore.textContent = 0;
  player2StoreScore.textContent = 0;
  CurrentScore = 0;
  scores = [0, 0];
  currentActivePLayer = 0;
  dice.classList.add("hidden");
  winnerChecking = true;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
});
