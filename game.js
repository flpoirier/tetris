var sqrsAcross = 12;
var sqrsTall = 20;
var cubeSide = 30;
var outerBorder = 10;
var border = 3;
var borderDiff = outerBorder - border;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var canvasWidth = ((cubeSide + border) * sqrsAcross) + border + borderDiff*2;
var canvasHeight = ((cubeSide + border) * sqrsTall) + border + borderDiff*2;

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

var rotateDelay;
var sideDelay;
var downDelay;

var pieceYGrid;
var pieceXGrid;
var pieceY;
var pieceX;
var pieceTimer;
var piecePos;

var begun = false;
var over = false;

var pieceWorth = 10;
var rowWorth = 100;

var score;
var numRows;

var pieces = require('./pieces.js');
var piece;
var nextPiece;
var grid;

var emptyColor = "#DDDDDD"; // grey
var borderColor = "#444444";

resetVars();

function createRow() {
  return Array.apply(null, Array(sqrsAcross)).map(String.prototype.valueOf,emptyColor);
}

function createGrid() {
  return Array.apply(null, Array(sqrsTall)).map( createRow );
}

function resetVars() {

  rotateDelay = 0;
  sideDelay = 0;
  downDelay = 0;

  score = 0;
  numRows = 0;

  pieceYGrid = 0;
  pieceXGrid = Math.floor(Math.random() * (sqrsAcross-3));
  pieceY = outerBorder;
  pieceX = (pieceXGrid) * (cubeSide + border) + outerBorder;
  pieceTimer = 0;
  piecePos = 0;
  piece = pieces[Math.floor(Math.random() * 7)];
  nextPiece = pieces[Math.floor(Math.random() * 7)];

  grid = createGrid();

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

  drawGrid();

}

function drawGrid() {

  ctx.clearRect(0,0, canvas.width, canvas.height);

  // ctx.fillStyle = "orange";
  // ctx.fillRect(0,0,canvas.width, canvas.height);

  var x = outerBorder;
  var y = outerBorder;

  ctx.fillStyle = borderColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  grid.forEach((row) => {

    row.forEach((square) => {

      ctx.fillStyle = square;
      ctx.fillRect(x,y,cubeSide,cubeSide);
      x += cubeSide + border;

    });

    y += cubeSide + border;
    x = outerBorder;
    drawPiece();

    drawNextPiece();

    printScore();

    if (!begun) {
      drawIntro();
    }

    if (over) {
      drawOutro();
    }

  });

}

function drawNextPiece() {

  ctx.fillStyle = borderColor;
  let xCoord = canvasWidth + cubeSide;
  let yCoord = cubeSide;
  let sideLength = (cubeSide*4)+(border*3)+(outerBorder*2);
  ctx.fillRect(xCoord,yCoord,sideLength,sideLength);

  xCoord += outerBorder;
  yCoord += outerBorder;
  ctx.fillStyle = emptyColor;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      ctx.fillRect(xCoord,yCoord,cubeSide,cubeSide);
      xCoord += cubeSide + border;
    }
    xCoord = canvasWidth + cubeSide + outerBorder;
    yCoord += cubeSide + border;
  }

  for (let idx = 0; idx < 4; idx++) {
    let x = nextPiece[0][idx][0];
    let y = nextPiece[0][idx][1];
    xCoord = canvasWidth + cubeSide + outerBorder;
    yCoord = cubeSide + outerBorder;
    ctx.fillStyle = nextPiece.color;
    ctx.fillRect(xCoord+(x*(cubeSide + border)), yCoord+(y*(cubeSide + border)), cubeSide, cubeSide);
  }

}

function drawPiece() {
  if (over) {
    return;
  }
  if (!begun) {
    return;
  }
  ctx.fillStyle = piece.color;
  for (let idx = 0; idx < 4; idx++) {
    let x = piece[piecePos][idx][0];
    let y = piece[piecePos][idx][1];
    ctx.fillRect(pieceX+(x*(cubeSide + border)), pieceY+(y*(cubeSide + border)), cubeSide, cubeSide);
  }
}

function drawIntro() {

  let xCoord = 3*cubeSide + 3*border + outerBorder;
  let yCoord = 7*cubeSide + 7*border + outerBorder;
  let width = (sqrsAcross - 6)*(cubeSide+border) - border;
  let height = 5*(cubeSide + border) - border;

  ctx.fillStyle = "#888888";
  ctx.fillRect(xCoord-outerBorder, yCoord-outerBorder, width+(2*outerBorder), height+(2*outerBorder));

  ctx.fillStyle = "white";//"#4B0082";
  ctx.fillRect(xCoord,yCoord,width,height);
  ctx.font = '48px sans-serif';
  ctx.fillStyle = "blue";
  //width = 171; half width = about 85; height = 48; half height = 24;
  // canvas width="514" height="642"

  ctx.fillText('TETRIS', (canvasWidth/2)-85, (canvasHeight/2)-24);

  ctx.fillStyle = "red";
  ctx.font = '18px sans-serif';
  //width: 100;
  ctx.fillText('Click to play!', (canvasWidth/2)-50, (canvasHeight/2)+15);
}

function drawOutro() {

  let xCoord = 3*cubeSide + 3*border + outerBorder;
  let yCoord = 7*cubeSide + 7*border + outerBorder;
  let width = (sqrsAcross - 6)*(cubeSide+border) - border;
  let height = 5*(cubeSide + border) - border;

  ctx.fillStyle = "#888888";
  ctx.fillRect(xCoord-outerBorder, yCoord-outerBorder, width+(2*outerBorder), height+(2*outerBorder));

  ctx.fillStyle = "white";//"#4B0082";
  ctx.fillRect(xCoord,yCoord,width,height);
  ctx.font = '30px sans-serif';
  ctx.fillStyle = "black";
  //width = 236; half width = about 118; height = 48; half height = 24;
  // canvas width="514" height="642"
  ctx.fillStyle = "red";
  ctx.fillText('GAME OVER', xCoord+6, yCoord+70);

  ctx.fillStyle = "blue";
  ctx.font = '18px sans-serif';
  //width: 94;
  ctx.fillText('Play again?', (canvasWidth/2)-45, (canvasHeight/2)+5);
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
    } else if (grid[y][x] != emptyColor) {
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
    grid[y][x] = piece.color;
  }
  score += pieceWorth;
}

function newPiece() {
  drawPiece();
  pieceYGrid = 0;
  pieceXGrid = Math.floor(Math.random() * (sqrsAcross-3));
  pieceY = outerBorder;
  pieceX = (pieceXGrid) * (cubeSide + border) + outerBorder;
  pieceTimer = 0;
  piecePos = 0;
  piece = nextPiece;
  nextPiece = pieces[Math.floor(Math.random() * 7)];
  if (pieceIntersecting()) {
    gameOver();
  }
}

function checkRows() {
  for (let row = 0; row < sqrsTall; row++) {
    let white = false;
    for (let col = 0; col < sqrsAcross; col++) {
      if (grid[row][col] === emptyColor) {
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
  grid.unshift(createRow());
  numRows += 1;
  score += rowWorth;
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

function printScore() {
  let x = canvasWidth + cubeSide*1.5;
  let y = (cubeSide*6.5) + (border*3) + (outerBorder*2);

  ctx.font = '24px sans-serif';

  ctx.fillStyle = "blue";
  ctx.fillText(`Score: ${score}`, x, y);

  y += 30;

  ctx.fillStyle = "red";
  ctx.fillText(`Rows: ${numRows}`, x, y);
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

drawGrid();
