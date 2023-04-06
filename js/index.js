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

const obstacleHeight = 20;
let obstacleWidth = 50;

let obstacle1 = {
  obstX: 0 + Math.floor(Math.random() * 400),
  obstY: 0,
  obstW: 100 + Math.floor(Math.random() * 200),
};

let obstacle2 = {
  obstX: 0 + Math.floor(Math.random() * 400),
  obstY: 0,
  obstW: 100 + Math.floor(Math.random() * 200),
};

let obstacle3 = {
  obstX: 0 + Math.floor(Math.random() * 400),
  obstY: 0,
  obstW: 100 + Math.floor(Math.random() * 200),
};

let obstacleY = 0;
let obstacleSpeed = 2;

let gameover = false;
let animationId;

let score = 0;

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

  drawScore();

  new Obstacle(
    obstacle1.obstX,
    obstacle1.obstY,
    obstacle1.obstW
  ).drawObstacle();

  obstableMove(obstacle1);

  if (obstacle1.obstY > 300 || obstacle2.obstY > 0) {
    new Obstacle(
      obstacle2.obstX,
      obstacle2.obstY,
      obstacle2.obstW
    ).drawObstacle();
    obstableMove(obstacle2);
  }

  if (obstacle2.obstY > 300 || obstacle3.obstY > 0) {
    new Obstacle(
      obstacle3.obstX,
      obstacle3.obstY,
      obstacle3.obstW
    ).drawObstacle();
    obstableMove(obstacle3);
  }

  if (gameover) {
    cancelAnimationFrame(animationId);
    drawGameover();
  } else {
    animationId = requestAnimationFrame(startGame);
  }

  restartobstacle();
}

if (obstacle1.obstY === canvas.height) {
  obstacle1 = {
    obstX: 50 + Math.floor(Math.random() * 300),
    obstY: 0,
    obstW: 100 + Math.floor(Math.random() * 200),
  };

  new Obstacle(
    obstacle1.obstX,
    obstacle1.obstY,
    obstacle1.obstW
  ).drawObstacle();

  obstableMove(obstacle1);
}

function restartobstacle() {
  if (obstacle1.obstY === canvas.height) {
    obstacle1 = {
      obstX: 0 + Math.floor(Math.random() * 400),
      obstY: 0,
      obstW: 100 + Math.floor(Math.random() * 200),
    };
  } else if (obstacle2.obstY === canvas.height) {
    obstacle2 = {
      obstX: 0 + Math.floor(Math.random() * 400),
      obstY: 0,
      obstW: 100 + Math.floor(Math.random() * 200),
    };
  } else if (obstacle3.obstY === canvas.height) {
    setTimeout(() => {
      obstacle3 = {
        obstX: 0 + Math.floor(Math.random() * 400),
        obstY: 0,
        obstW: 100 + Math.floor(Math.random() * 200),
      };
    }, 500);
  }
}

function obstableMove(obstacleArr) {
  obstacleArr.obstY += obstacleSpeed;

  if (
    obstacleArr.obstY === carY - carMargin &&
    obstacleArr.obstX <= carX + carWidth &&
    obstacleArr.obstX + obstacleArr.obstW > carX
  ) {
    gameover = true;
  }

  if (obstacleArr.obstY === canvas.height) {
    score += 1;
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

class Obstacle {
  constructor(obstX, obstY, obstWidth) {
    this.obstX = obstX;
    this.obstY = obstY;
    this.obstWidth = obstWidth;
  }

  drawObstacle() {
    ctx.beginPath();
    ctx.fillStyle = "firebrick";
    ctx.fillRect(this.obstX, this.obstY, this.obstWidth, obstacleHeight);
    ctx.closePath();
  }

  setObstacle() {
    this.obstY += 150;
    console.log("hey");
  }
}
