var sqrsAcross = 16;
var sqrsTall = 20;
var cubeSide = 30;
var outerBorder = 5;
var border = 2;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var canvasWidth = ((cubeSide + border) * sqrsAcross) + border;
var canvasHeight = ((cubeSide + border) * sqrsTall) + border;

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

var rotateDelay = 0;
var sideDelay = 0;
var downDelay = 0;

var pieceYGrid = 0;
var pieceXGrid = Math.floor(Math.random() * 13);
var pieceY = border;
var pieceX = (pieceXGrid) * (cubeSide + border) + border;
var pieceTimer = 0;
var piecePos = 0;

var begun = false;
var over = false;

var pieces = require('./pieces.js');
var piece = pieces[Math.floor(Math.random() * 7)];

var colors = {};
colors["x"] = "#DDDDDD";
colors["r"] = "red";
colors["o"] = "orange";
colors["y"] = "yellow";
colors["g"] = "green";
colors["b"] = "blue";
colors["p"] = "purple";
colors["k"] = "pink";

var grid = [

  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],

];

function resetVars() {

  rotateDelay = 0;
  sideDelay = 0;
  downDelay = 0;

  pieceYGrid = 0;
  pieceXGrid = Math.floor(Math.random() * 13);
  pieceY = border;
  pieceX = (pieceXGrid) * (cubeSide + border) + border;
  pieceTimer = 0;
  piecePos = 0;
  piece = pieces[Math.floor(Math.random() * 7)];


  grid = [

    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],

  ];

}

function play() {

  pieceCheck("down");

  if (rotateDelay > 0) {
    rotateDelay -= 1;
  }

  if (sideDelay > 0) {
    sideDelay -= 1;
  }

  if (downDelay > 0) {
    downDelay -= 1;
  }

  if (leftPressed && sideDelay === 0) {
    pieceX -= (cubeSide + border);
    pieceXGrid -= 1;
    sideDelay = 3;
  }

  pieceCheck("left");

  if (rightPressed && sideDelay === 0) {
    pieceX += (cubeSide + border);
    pieceXGrid += 1;
    sideDelay = 3;
  }

  pieceCheck("right");

  if (downPressed && downDelay === 0) {
    pieceY += (cubeSide + border);
    pieceYGrid += 1;
    downDelay = 3;
  }

  pieceCheck("down");

  if (upPressed && piecePos < 3 && rotateDelay === 0) {
    piecePos += 1;
    rotateDelay = 3;
  } else if (upPressed & piecePos >= 3 && rotateDelay === 0) {
    piecePos = 0;
    rotateDelay = 3;
  }

  pieceCheck("rot");

  checkRows();

}

function drawGrid() {
  // 
  // ctx.fillStyle = "orange";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  var x = border;
  var y = border;

  ctx.fillStyle = "#777777";
  ctx.fillRect(0, 0, (sqrsAcross*(cubeSide+border)+border), (sqrsTall*(cubeSide+border)+border));

  grid.forEach((row) => {

    row.forEach((square) => {

      ctx.fillStyle = colors[square];
      ctx.fillRect(x,y,cubeSide,cubeSide);
      x += cubeSide + border;

    });

    y += cubeSide + border;
    x = border;
    drawPiece();

    if (!begun) {
      drawIntro();
    }

    if (over) {
      drawOutro();
    }

  });

}

function drawPiece() {
  if (over) {
    return;
  }
  if (!begun) {
    return;
  }
  ctx.fillStyle = colors[piece.symbol];
  for (let idx = 0; idx < 4; idx++) {
    let x = piece[piecePos][idx][0];
    let y = piece[piecePos][idx][1];
    ctx.fillRect(pieceX+(x*(cubeSide + border)), pieceY+(y*(cubeSide + border)), cubeSide, cubeSide);
  }
}

function drawIntro() {
  ctx.fillStyle = "#4B0082";
  ctx.fillRect((cubeSide+border)*4+border, (cubeSide+border)*6+border, 254, 190);
  ctx.font = '48px sans-serif';
  ctx.fillStyle = "white";
  //width = 171; half width = about 85; height = 48; half height = 24;
  // canvas width="514" height="642"

  ctx.fillText('TETRIS', 172, 297);

  ctx.font = '18px sans-serif';
  //width: 100;
  ctx.fillText('Click to play!', 207, 335);
}

function drawOutro() {
  ctx.fillStyle = "#4B0082";
  ctx.fillRect((cubeSide+border)*4+border, (cubeSide+border)*6+border, 254, 190);
  ctx.font = '39px sans-serif';
  ctx.fillStyle = "white";
  //width = 236; half width = about 118; height = 48; half height = 24;
  // canvas width="514" height="642"

  ctx.fillText('GAME OVER', 139, 297);

  ctx.font = '18px sans-serif';
  //width: 94;
  ctx.fillText('Play again?', 210, 335);
}

function pieceIntersecting() {
  let intersecting = false;
  for (let idx = 0; idx < 4; idx++) {
    let x = piece[piecePos][idx][0] + pieceXGrid;
    let y = piece[piecePos][idx][1] + pieceYGrid;
    if (y >= sqrsTall) {
      intersecting = true;
    } else if (x >= sqrsAcross) {
      intersecting = true;
    } else if (x < 0) {
      intersecting = true;
    } else if (grid[y][x] != "x") {
      intersecting = true;
    }
  }
  return intersecting;
}

function pieceCheck(direction) {
  if (pieceIntersecting()) {
    if (direction === "left") {
      pieceX += (cubeSide + border);
      pieceXGrid += 1;
    } else if (direction === "right") {
      pieceX -= (cubeSide + border);
      pieceXGrid -= 1;
    } else if (direction === "down") {
      pieceY -= (cubeSide + border);
      pieceYGrid -= 1;
      // only creates a new piece if move would intersect on the bottom
      pieceStop();
      newPiece();
    } else if (direction === "rot") {
      piecePos -= 1;
      if (piecePos < 0) {
        piecePos = 3;
      }
    }
  }
}

function pieceStop() {
  for (let idx = 0; idx < 4; idx++) {
    let x = piece[piecePos][idx][0] + pieceXGrid;
    let y = piece[piecePos][idx][1] + pieceYGrid;
    grid[y][x] = piece.symbol;
  }
}

function newPiece() {
  drawPiece();
  pieceYGrid = 0;
  pieceXGrid = Math.floor(Math.random() * 13);
  pieceY = border;
  pieceX = (pieceXGrid) * (cubeSide + border) + border;
  pieceTimer = 0;
  piecePos = 0;
  piece = pieces[Math.floor(Math.random() * 7)];
  if (pieceIntersecting()) {
    gameOver();
  }
}

function checkRows() {
  for (let row = 0; row < sqrsTall; row++) {
    let white = false;
    for (let col = 0; col < sqrsAcross; col++) {
      if (grid[row][col] === "x") {
        white = true;
      }
    }
    if (!white) {
      deleteRow(row);
    }
  }
}

function deleteRow(row) {
  grid.splice(row, 1);
  grid.unshift(["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"]);
}

function startGame() {
  document.removeEventListener("click", startGame);
  document.addEventListener("click", pause);
  over = false;
  begun = true;
  playInterval = setInterval(play, 50);
  downInterval = setInterval(pieceDown, 50);
  resetVars();
}

function gameOver() {
  over = true;
  document.removeEventListener("click", pause);
  clearInterval(playInterval);
  clearInterval(downInterval);
  document.addEventListener("click", startGame, false);
}

function pieceDown() {
  pieceTimer += 1;

  if (pieceTimer === 10) {
    pieceY += (cubeSide + border);
    pieceYGrid += 1;
    pieceTimer = 0;
  }
}

function pause() {
  document.removeEventListener("click", pause);
  document.addEventListener("click", resume);
  clearInterval(downInterval);
  clearInterval(playInterval);
}

function resume() {
  document.removeEventListener("click", resume);
  document.addEventListener("click", pause);
  playInterval = setInterval(play, 50);
  downInterval = setInterval(pieceDown, 50);
}

function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
  else if(e.keyCode == 38) {
    upPressed = true;
  }
  else if(e.keyCode == 40) {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  else if(e.keyCode == 37) {
    leftPressed = false;
  }
  else if(e.keyCode == 38) {
    upPressed = false;
  }
  else if(e.keyCode == 40) {
    downPressed = false;
  }
}

document.addEventListener("click", startGame, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

drawInterval = setInterval(drawGrid, 50);
