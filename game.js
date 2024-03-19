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
let dx = 2;
let dy = -2;

// changing colors for fun
let ballColor = changeColor();
let paddleColor = changeColor();

// score
let score = 0;
let highScore = 0;

function changeColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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
  ctx.fillRect(4, 1.5, 93, 29);
  ctx.font = "22px Antonio";
  ctx.fillStyle = "#efeaea";
  ctx.fillText(`Score: ${score}`, 10, 24); // last 2 values are coordinates for text

  if (score > highScore) {
    highScore = score;
    document.querySelector("#topScore").textContent = highScore;
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
