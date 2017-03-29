/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// each piece is composed of four squares and has four possible rotations,
// each of which can fit in a four-by-four grid. each line of code
// consists of a single rotation of a single piece. The four coordinates on each
// line represent the x,y positions of each square of the piece, given by their
// displacement from the top left corner of the four-by-four grid (for example,
// the bottom right corner would be represented by [3,3])

// sample visualization and coordinates of a long piece:

// [_,_,x,_]  -->  [2,0]
// [_,_,x,_]  -->  [2,1]
// [_,_,x,_]  -->  [2,2]
// [_,_,x,_]  -->  [2,3]

// the symbols are used to mark the master grid with the correct color once the
// pieces have settled.

var long = {};
long[0] = [[0,1],[1,1],[2,1],[3,1]];
long[1] = [[2,0],[2,1],[2,2],[2,3]];
long[2] = [[0,2],[1,2],[2,2],[3,2]];
long[3] = [[1,0],[1,1],[1,2],[1,3]];
long.symbol = "g"; // green

var ell1 = {};
ell1[0] = [[1,0],[1,1],[1,2],[0,2]];
ell1[1] = [[0,0],[0,1],[1,1],[2,1]];
ell1[2] = [[1,0],[2,0],[1,1],[1,2]];
ell1[3] = [[0,1],[1,1],[2,1],[2,2]];
ell1.symbol = "o"; // orange

var ell2 = {};
ell2[0] = [[1,0],[1,1],[1,2],[2,2]];
ell2[1] = [[0,1],[1,1],[2,1],[0,2]];
ell2[2] = [[0,0],[1,0],[1,1],[1,2]];
ell2[3] = [[2,0],[0,1],[1,1],[2,1]];
ell2.symbol = "y"; // yellow

var square = {};
square[0] = [[0,0],[1,0],[0,1],[1,1]];
square[1] = [[0,0],[1,0],[0,1],[1,1]];
square[2] = [[0,0],[1,0],[0,1],[1,1]];
square[3] = [[0,0],[1,0],[0,1],[1,1]];
square.symbol = "k"; // pink

var zag1 = {};
zag1[0] = [[1,1],[2,1],[0,2],[1,2]];
zag1[1] = [[0,0],[0,1],[1,1],[1,2]];
zag1[2] = [[1,0],[2,0],[0,1],[1,1]];
zag1[3] = [[1,0],[1,1],[2,1],[2,2]];
zag1.symbol = "p"; // purple

var tee = {};
tee[0] = [[0,1],[1,1],[2,1],[1,2]];
tee[1] = [[1,0],[0,1],[1,1],[1,2]];
tee[2] = [[1,0],[0,1],[1,1],[2,1]];
tee[3] = [[1,0],[1,1],[1,2],[2,1]];
tee.symbol = "r"; // red

var zag2 = {};
zag2[0] = [[0,1],[1,1],[1,2],[2,2]];
zag2[1] = [[1,0],[0,1],[1,1],[0,2]];
zag2[2] = [[0,0],[1,0],[1,1],[2,1]];
zag2[3] = [[2,0],[1,1],[2,1],[1,2]];
zag2.symbol = "b"; // blue

var pieces = [long, ell1, ell2, square, zag1, tee, zag2];

module.exports = pieces;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var sqrsAcross = 10;
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

var rotateDelay = 0;
var sideDelay = 0;
var downDelay = 0;

var pieceYGrid = 0;
var pieceXGrid = Math.floor(Math.random() * (sqrsAcross-3));
var pieceY = outerBorder;
var pieceX = (pieceXGrid) * (cubeSide + border) + outerBorder;
var pieceTimer = 0;
var piecePos = 0;

var begun = false;
var over = false;

var pieces = __webpack_require__(0);
var piece = pieces[Math.floor(Math.random() * 7)];

var colors = {};
colors["x"] = "#DDDDDD";
colors["r"] = "red";
colors["o"] = "orange";
colors["y"] = "yellow";
colors["g"] = "green";
colors["b"] = "blue";
colors["p"] = "purple";
colors["k"] = "#FF69B4";


function createRow() {
  return Array.apply(null, Array(sqrsAcross)).map(String.prototype.valueOf,"x");
}

function createGrid() {
  return Array.apply(null, Array(sqrsTall)).map( createRow );
}

var grid = createGrid();

function resetVars() {

  rotateDelay = 0;
  sideDelay = 0;
  downDelay = 0;

  pieceYGrid = 0;
  pieceXGrid = Math.floor(Math.random() * (sqrsAcross-3));
  pieceY = outerBorder;
  pieceX = (pieceXGrid) * (cubeSide + border) + outerBorder;
  pieceTimer = 0;
  piecePos = 0;
  piece = pieces[Math.floor(Math.random() * 7)];
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

}

function drawGrid() {

  ctx.clearRect(0,0, canvas.width, canvas.height);

  var x = outerBorder;
  var y = outerBorder;

  ctx.fillStyle = "#444444";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  grid.forEach((row) => {

    row.forEach((square) => {

      ctx.fillStyle = colors[square];
      ctx.fillRect(x,y,cubeSide,cubeSide);
      x += cubeSide + border;

    });

    y += cubeSide + border;
    x = outerBorder;
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
  pieceXGrid = Math.floor(Math.random() * (sqrsAcross-3));
  pieceY = outerBorder;
  pieceX = (pieceXGrid) * (cubeSide + border) + outerBorder;
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


/***/ })
/******/ ]);