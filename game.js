const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const ballRadius = 10;

// variables for paddle
const paddleHeight = 15;
const paddleWidth = 90;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

// defining variables for position of ball
let x = canvas.width / 2;
let y = canvas.height - 30;

// add values to x, y after draw function
let dx = 3;
let dy = -2;

// changing colors for fun
let ballColor = changeColor();
let paddleColor = changeColor();

// score
let score = 0;
let highScore = 0;

function changeColor() {
  let randomIndex = Math.floor(Math.random() * 25); // wanna include 0 indexed colors
  const colors = [
    "#F8B195",
    "#F67280",
    "#C06C84",
    "#6C5B7B",
    "#355C7D",
    "#99B898",
    "#FECEAB",
    "#FF847C",
    "#E84A5F",
    "#2A363B",
    "#FE4365",
    "#FC9D9A",
    "#F9CDAD",
    "#C8C8A9",
    "#83AF9B",
    "#EDE574 ",
    "#F9D423",
    "#FC913A",
    "#FF4E50",
    "#A8A7A7",
    "#CC527A",
    "#E8175D",
    "#474747",
    "#363636",
    "#547980",
  ];

  for (let i = 0; i < colors.length; i++) {
    return colors[randomIndex];
  }
}

// cleaning up code, separate draw ball into it's own function
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

// drawing the paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = paddleColor;
  ctx.fill();
  ctx.closePath();
}

// function to constantly update the canvas
function draw() {
  // clear canvas after new frame is painted
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall(); // call draw ball function
  drawPaddle(); // call draw paddle function
  drawScore(); // call score function

  // makes the ball move to a new position every update
  x += dx;
  y += dy;

  // deals with the ball bouncing off the top edge
  if (y + dy < ballRadius) {
    dy = -dy;
  }

  // game over
  else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      score++;
    } else {
      //   alert("GAME OVER");
      swal(
        "Game Over 👎😞",
        `Score: ${score}\n🏆 High Score: ${highScore}`,
        "error"
      );
      score = 0;
    } // ends the game
  }

  // bouncing off the left and right and doesn't sink into wall bc of ballradius
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  // checking if the left or right keys are pressed
  if (rightPressed) {
    paddleX += 3;
  } else if (leftPressed) {
    paddleX -= 3;
  }

  if (rightPressed) {
    paddleX = Math.min(paddleX + 3, canvas.width - paddleWidth);
  } else if (leftPressed) {
    paddleX = Math.max(paddleX - 3, 0);
  }
}

// function to update score
function drawScore() {
  ctx.fillRect(0.2, 0.5, 134.2, 28);
  ctx.font = "21px Antonio";
  ctx.fillStyle = "#efeaea";
  ctx.fillText(`Score: ${score}`, 40, 24); // last 2 values are coordinates for text

  if (score > highScore) {
    highScore = score;
    document.querySelector("#topScore").textContent = highScore;
    if (highScore >= 20) {
      document.querySelector("#topScore").textContent += "🏆 ";
    }
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

const interval = setInterval(draw, 25);
