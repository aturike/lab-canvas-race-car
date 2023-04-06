const startPage = document.querySelector(".game-intro");

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const bgImg = new Image();
bgImg.src = "../images/road.png";

const carImg = new Image();
carImg.src = "../images/car.png";
const carWidth = 50;
const carHeigth = 100;
const carMargin = 10;
let carY = canvas.height - carHeigth - carMargin;
let carX = canvas.width / 2 - carWidth / 2;
let isCarGoLeft = false;
let isCarGoRight = false;

let gameover = false;
let animationId;

let score = 0;

let firstObst = {};
let secondObst = {};
let thirdObst = {};
let obstacleSpeed = 2;

class Obstacle {
  constructor(obstX, obstY, obstWidth) {
    this.obstX = obstX;
    this.obstY = obstY;
    this.obstWidth = obstWidth;
  }

  drawObstacle() {
    ctx.beginPath();
    ctx.fillStyle = "firebrick";
    ctx.fillRect(this.obstX, this.obstY, this.obstWidth, 20);
    ctx.closePath();
  }

  moveObstacle() {
    this.obstY += obstacleSpeed;

    if (
      this.obstY > carY - carMargin &&
      this.obstX <= carX + carWidth &&
      this.obstX + this.obstWidth > carX
    ) {
      gameover = true;
    }

    if (this.obstY > canvas.height) {
      score += 1;
    }

    if (this.obstY > canvas.height) {
      this.obstX = 0 + Math.floor(Math.random() * 400);
      this.obstY = 0;
      this.obstWidth = 100 + Math.floor(Math.random() * 200);
    }
  }
}

window.onload = () => {
  canvas.style.display = "none";

  document.getElementById("start-button").onclick = () => {
    startPage.style.display = "none";
    canvas.style.display = "block";

    startGame();
  };

  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
      isCarGoLeft = true;
    }
    if (event.code === "ArrowRight") {
      isCarGoRight = true;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft") {
      isCarGoLeft = false;
    }
    if (event.code === "ArrowRight") {
      isCarGoRight = false;
    }
  });
};

function startGame() {
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  drawCar();

  if (isCarGoLeft && carX > 0) {
    carX -= 3;
  } else if (isCarGoRight && carX < canvas.width - carWidth) {
    carX += 3;
  }

  if (!firstObst.obstY) {
    firstObst = new Obstacle(
      0 + Math.floor(Math.random() * 400),
      0,
      100 + Math.floor(Math.random() * 200)
    );
  }

  firstObst.drawObstacle();
  firstObst.moveObstacle();

  if (firstObst.obstY > 250 || secondObst.obstY > 0) {
    if (!secondObst.obstY) {
      secondObst = new Obstacle(
        0 + Math.floor(Math.random() * 400),
        0,
        100 + Math.floor(Math.random() * 200)
      );
    }

    secondObst.drawObstacle();
    secondObst.moveObstacle();
  }

  if (secondObst.obstY > 250 || thirdObst.obstY > 0) {
    if (!thirdObst.obstY) {
      thirdObst = new Obstacle(
        0 + Math.floor(Math.random() * 400),
        0,
        100 + Math.floor(Math.random() * 200)
      );
    }

    thirdObst.drawObstacle();
    thirdObst.moveObstacle();
  }

  drawScore();

  if (gameover) {
    cancelAnimationFrame(animationId);
    drawGameover();
  } else {
    animationId = requestAnimationFrame(startGame);
  }

  //Level up

  if (score % 10 === 0 && score !== 0) {
    obstacleSpeed = 4;
  }
}

function drawCar() {
  ctx.drawImage(carImg, carX, carY, carWidth, carHeigth);
}

function drawGameover() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.font = "50px sans-serif";
  ctx.fillStyle = "white";
  ctx.fillText("GAME OVER", canvas.width / 2 - 150, canvas.height / 2 - 80);
  ctx.closePath();
  drawScore();
}

function drawScore() {
  ctx.beginPath();
  ctx.font = "30px sans-serif";
  ctx.fillStyle = "white";
  ctx.fillText(`Score : ${score}`, 150, canvas.height / 2 - 30);
  ctx.closePath();
}
