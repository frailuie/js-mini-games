"use strict";

/*
da plan~!
set an array to a set of color values
loop through the values
assign a new color to the title after some seconds 
*/

// for changing color of title
const headerText = document.getElementById("headerText");

const colors = [
  "#fcb3b3",
  "#fcc0b3",
  "#fccab3",
  "#fcd1b3",
  "#fce6b3",
  "#fcefb3",
  "#fcf8b3",
  "#f0fcb3",
  "#e0fcb3",
  "#d7fcb3",
  "#c9fcb3",
  "#b9fcb3",
  "#b3fcc0",
  "#b3fcd4",
  "#b3fce2",
  "#b3ddfc",
  "#b3c7fc",
  "#b5b3fc",
  "#cfb3fc",
  "#e5b3fc",
  "#fab3fc",
  "#fcb3ea",
  "#fcb3d5",
  "#c6fcb3",
  "#dcfcd1",
  "#ebfce5",
  "#f8fcf7",
  "#e3e5e3",
  "#caccc9",
  "#aeafae",
];

// using a for loop this time instead of random()
for (let i = 0; i < colors.length; i++) {
  setTimeout(() => {
    headerText.style.color = colors[i];
  }, i * 400);
}

// game variables
let secretNumber = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

// teacher's tip 🧑‍🏫
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
}; // using functions to make the code more DRY

// event listener for check button

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  // when no number has been entered
  if (!guess) {
    // STUDY: if the value of guess is falsy, do this vv
    displayMessage("No number entered ⛔");
  }
  // winning the game
  else if (guess === secretNumber) {
    displayMessage("👌 Correct number!");
    document.body.style.backgroundColor = "#54c465"; //green
    headerText.style.color = "#f7f7f7"; //white
    document.querySelector(".number").textContent = secretNumber;

    // editing highscore variable
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  }
  // if guess is wrong
  else if (guess !== secretNumber) {
    // TIP: guess is different from secretNumber, covers both > or < scenarios
    if (score > 1) {
      guess > secretNumber
        ? displayMessage("📈 Too high!")
        : displayMessage("📉 Too low!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("Aw, you lose! 💣");
      document.querySelector(".score").textContent = 0;
      document.body.style.backgroundColor = "#ea1e1e"; //red
      headerText.style.color = "#fffcfc";
    }
  }
});

// restart game function
document.querySelector(".again").addEventListener("click", function () {
  // re-assigning score
  score = 20;
  document.querySelector(".score").textContent = score;
  // re-assign secret number
  secretNumber = Math.floor(Math.random() * 20) + 1;
  // restore background styling
  document.body.style.backgroundColor = "#232222";
  // restore text content
  displayMessage("Start guessing...");
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
});
