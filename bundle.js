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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DrawingFunctions {

  constructor(game) {

    this.drawGrid = this.drawGrid.bind(game);
    this.drawNextPiece = this.drawNextPiece.bind(game);
    this.drawPiece = this.drawPiece.bind(game);
    this.drawIntro = this.drawIntro.bind(game);
    this.drawOutro = this.drawOutro.bind(game);
    this.printScore = this.printScore.bind(game);

  }

  drawGrid() {

    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

    // ctx.fillStyle = "orange";
    // ctx.fillRect(0,0,canvas.width, canvas.height);

    var x = this.outerBorder;
    var y = this.outerBorder;

    this.ctx.fillStyle = this.borderColor;
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.grid.forEach((row) => {

      row.forEach((square) => {

        this.ctx.fillStyle = square;
        this.ctx.fillRect(x,y,this.cubeSide,this.cubeSide);
        x += this.cubeSide + this.border;

      });

      y += this.cubeSide + this.border;
      x = this.outerBorder;
      this.drawPiece();

      this.drawNextPiece();

      this.printScore();

      if (!this.begun) {
        this.drawIntro();
      }

      if (this.over) {
        this.drawOutro();
      }

    });

  }

  drawNextPiece() {

    this.ctx.fillStyle = this.borderColor;
    let xCoord = this.canvasWidth + this.cubeSide;
    let yCoord = this.cubeSide;
    let sideLength = (this.cubeSide*4)+(this.border*3)+(this.outerBorder*2);
    this.ctx.fillRect(xCoord,yCoord,sideLength,sideLength);

    xCoord += this.outerBorder;
    yCoord += this.outerBorder;
    this.ctx.fillStyle = this.emptyColor;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.ctx.fillRect(xCoord,yCoord,this.cubeSide,this.cubeSide);
        xCoord += this.cubeSide + this.border;
      }
      xCoord = this.canvasWidth + this.cubeSide + this.outerBorder;
      yCoord += this.cubeSide + this.border;
    }

    for (let idx = 0; idx < 4; idx++) {
      let x = this.nextPiece[0][idx][0];
      let y = this.nextPiece[0][idx][1];
      xCoord = this.canvasWidth + this.cubeSide + this.outerBorder;
      yCoord = this.cubeSide + this.outerBorder;
      this.ctx.fillStyle = this.nextPiece.color;
      this.ctx.fillRect(xCoord+(x*(this.cubeSide + this.border)), yCoord+(y*(this.cubeSide + this.border)), this.cubeSide, this.cubeSide);
    }

  }

  drawPiece() {
    if (this.over) {
      return;
    }
    if (!this.begun) {
      return;
    }
    this.ctx.fillStyle = this.piece.color;
    for (let idx = 0; idx < 4; idx++) {
      let x = this.piece[this.piecePos][idx][0];
      let y = this.piece[this.piecePos][idx][1];
      this.ctx.fillRect(this.pieceX+(x*(this.cubeSide + this.border)), this.pieceY+(y*(this.cubeSide + this.border)), this.cubeSide, this.cubeSide);
    }
  }

  drawIntro() {

    let xCoord = 3*this.cubeSide + 3*this.border + this.outerBorder;
    let yCoord = 7*this.cubeSide + 7*this.border + this.outerBorder;
    let width = (this.sqrsAcross - 6)*(this.cubeSide+this.border) - this.border;
    let height = 5*(this.cubeSide + this.border) - this.border;

    this.ctx.fillStyle = "#888888";
    this.ctx.fillRect(xCoord-this.outerBorder, yCoord-this.outerBorder, width+(2*this.outerBorder), height+(2*this.outerBorder));

    this.ctx.fillStyle = "white";//"#4B0082";
    this.ctx.fillRect(xCoord,yCoord,width,height);
    this.ctx.font = '48px sans-serif';
    this.ctx.fillStyle = "blue";
    //width = 171; half width = about 85; height = 48; half height = 24;
    // canvas width="514" height="642"

    this.ctx.fillText('TETRIS', (this.canvasWidth/2)-85, (this.canvasHeight/2)-24);

    this.ctx.fillStyle = "red";
    this.ctx.font = '18px sans-serif';
    //width: 100;
    this.ctx.fillText('Click to play!', (this.canvasWidth/2)-50, (this.canvasHeight/2)+15);
  }

  drawOutro() {

    let xCoord = 3*this.cubeSide + 3*this.border + this.outerBorder;
    let yCoord = 7*this.cubeSide + 7*this.border + this.outerBorder;
    let width = (this.sqrsAcross - 6)*(this.cubeSide+this.border) - this.border;
    let height = 5*(this.cubeSide + this.border) - this.border;

    this.ctx.fillStyle = "#888888";
    this.ctx.fillRect(xCoord-this.outerBorder, yCoord-this.outerBorder, width+(2*this.outerBorder), height+(2*this.outerBorder));

    this.ctx.fillStyle = "white";//"#4B0082";
    this.ctx.fillRect(xCoord,yCoord,width,height);
    this.ctx.font = '30px sans-serif';
    this.ctx.fillStyle = "black";
    //width = 236; half width = about 118; height = 48; half height = 24;
    // canvas width="514" height="642"
    this.ctx.fillStyle = "red";
    this.ctx.fillText('GAME OVER', xCoord+6, yCoord+70);

    this.ctx.fillStyle = "blue";
    this.ctx.font = '18px sans-serif';
    //width: 94;
    this.ctx.fillText('Play again?', (this.canvasWidth/2)-45, (this.canvasHeight/2)+5);
  }

  printScore() {
    let x = this.canvasWidth + this.cubeSide*1.5;
    let y = (this.cubeSide*6.5) + (this.border*3) + (this.outerBorder*2);

    this.ctx.font = '24px sans-serif';

    this.ctx.fillStyle = "green";
    this.ctx.fillText(`Level ${this.level}`, x, y);

    y += 30;

    this.ctx.fillStyle = "blue";
    this.ctx.fillText(`Score: ${this.score}`, x, y);

    y += 30;

    this.ctx.fillStyle = "red";
    this.ctx.fillText(`Rows: ${this.numRows}`, x, y);
  }

}

module.exports = DrawingFunctions;


/***/ }),
/* 1 */
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

class Pieces {

  constructor() {

    this.long = {};
    this.long[0] = [[0,1],[1,1],[2,1],[3,1]];
    this.long[1] = [[2,0],[2,1],[2,2],[2,3]];
    this.long[2] = [[0,2],[1,2],[2,2],[3,2]];
    this.long[3] = [[1,0],[1,1],[1,2],[1,3]];
    this.long.color = "green";

    this.ell1 = {};
    this.ell1[0] = [[1,0],[1,1],[1,2],[0,2]];
    this.ell1[1] = [[0,0],[0,1],[1,1],[2,1]];
    this.ell1[2] = [[1,0],[2,0],[1,1],[1,2]];
    this.ell1[3] = [[0,1],[1,1],[2,1],[2,2]];
    this.ell1.color = "orange";

    this.ell2 = {};
    this.ell2[0] = [[1,0],[1,1],[1,2],[2,2]];
    this.ell2[1] = [[0,1],[1,1],[2,1],[0,2]];
    this.ell2[2] = [[0,0],[1,0],[1,1],[1,2]];
    this.ell2[3] = [[2,0],[0,1],[1,1],[2,1]];
    this.ell2.color = "yellow";

    this.square = {};
    this.square[0] = [[0,0],[1,0],[0,1],[1,1]];
    this.square[1] = [[0,0],[1,0],[0,1],[1,1]];
    this.square[2] = [[0,0],[1,0],[0,1],[1,1]];
    this.square[3] = [[0,0],[1,0],[0,1],[1,1]];
    this.square.color = "#FF69B4"; // pink

    this.zag1 = {};
    this.zag1[0] = [[1,1],[2,1],[0,2],[1,2]];
    this.zag1[1] = [[0,0],[0,1],[1,1],[1,2]];
    this.zag1[2] = [[1,0],[2,0],[0,1],[1,1]];
    this.zag1[3] = [[1,0],[1,1],[2,1],[2,2]];
    this.zag1.color = "purple";

    this.tee = {};
    this.tee[0] = [[0,1],[1,1],[2,1],[1,2]];
    this.tee[1] = [[1,0],[0,1],[1,1],[1,2]];
    this.tee[2] = [[1,0],[0,1],[1,1],[2,1]];
    this.tee[3] = [[1,0],[1,1],[1,2],[2,1]];
    this.tee.color = "red";

    this.zag2 = {};
    this.zag2[0] = [[0,1],[1,1],[1,2],[2,2]];
    this.zag2[1] = [[1,0],[0,1],[1,1],[0,2]];
    this.zag2[2] = [[0,0],[1,0],[1,1],[2,1]];
    this.zag2[3] = [[2,0],[1,1],[2,1],[1,2]];
    this.zag2.color = "blue";

    this.pieces = [this.long, this.ell1, this.ell2, this.square, this.zag1, this.tee, this.zag2];

  }

}

module.exports = Pieces;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


const Pieces = __webpack_require__(1);
const DrawingFunctions = __webpack_require__(0);

class Game {

  constructor() {

    this.sqrsAcross = 12;
    this.sqrsTall = 20;
    this.cubeSide = 30;
    this.outerBorder = 10;
    this.border = 3;
    this.borderDiff = this.outerBorder - this.border;

    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = ((this.cubeSide + this.border) * this.sqrsAcross) + this.border + this.borderDiff*2;
    this.canvasHeight = ((this.cubeSide + this.border) * this.sqrsTall) + this.border + this.borderDiff*2;

    this.upPressed = false;
    this.downPressed = false;
    this.leftPressed = false;
    this.rightPressed = false;

    this.begun = false;
    this.over = false;

    this.pieceWorth = 10;
    this.rowWorth = 100;

    let pieceSet = new Pieces();
    this.pieces = pieceSet.pieces;

    this.emptyColor = "#DDDDDD"; // grey
    this.borderColor = "#444444";

    this.startSpeed = 50;

    this.createRow = this.createRow.bind(this);
    this.createGrid = this.createGrid.bind(this);
    this.resetVars = this.resetVars.bind(this);
    this.play = this.play.bind(this);

    let draw = new DrawingFunctions(this);
    this.drawGrid = draw.drawGrid;
    this.drawNextPiece = draw.drawNextPiece;
    this.drawPiece = draw.drawPiece;
    this.drawIntro = draw.drawIntro;
    this.drawOutro = draw.drawOutro;
    this.printScore = draw.printScore;

    this.pieceIntersecting = this.pieceIntersecting.bind(this);
    this.pieceCheck = this.pieceCheck.bind(this);
    this.pieceStop = this.pieceStop.bind(this);
    this.newPiece = this.newPiece.bind(this);
    this.checkRows = this.checkRows.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.startGame = this.startGame.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.pieceDown = this.pieceDown.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.levelUp = this.levelUp.bind(this);


    this.resetVars();

    document.addEventListener("click", this.startGame, false);
    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);

    this.drawGrid();

  }


  createRow() {
    return Array.apply(null, Array(this.sqrsAcross)).map(String.prototype.valueOf,this.emptyColor);
  }

  createGrid() {
    return Array.apply(null, Array(this.sqrsTall)).map( this.createRow );
  }

  resetVars() {

    this.rotateDelay = 0;
    this.sideDelay = 0;
    this.downDelay = 0;

    this.score = 0;
    this.numRows = 0;
    this.level = 1;
    this.speed = this.startSpeed;

    this.pieceYGrid = 0;
    this.pieceXGrid = Math.floor(Math.random() * (this.sqrsAcross-3));
    this.pieceY = this.outerBorder;
    this.pieceX = (this.pieceXGrid) * (this.cubeSide + this.border) + this.outerBorder;
    this.pieceTimer = 0;
    this.piecePos = 0;
    this.piece = this.pieces[Math.floor(Math.random() * 7)];
    this.nextPiece = this.pieces[Math.floor(Math.random() * 7)];

    this.grid = this.createGrid();

  }

  play() {

    this.pieceCheck("down");

    if (this.rotateDelay > 0) {
      this.rotateDelay -= 1;
    }

    if (this.sideDelay > 0) {
      this.sideDelay -= 1;
    }

    if (this.downDelay > 0) {
      this.downDelay -= 1;
    }

    if (this.leftPressed && this.sideDelay === 0) {
      this.pieceX -= (this.cubeSide + this.border);
      this.pieceXGrid -= 1;
      this.sideDelay = 3;
    }

    this.pieceCheck("left");

    if (this.rightPressed && this.sideDelay === 0) {
      this.pieceX += (this.cubeSide + this.border);
      this.pieceXGrid += 1;
      this.sideDelay = 3;
    }

    this.pieceCheck("right");

    if (this.downPressed && this.downDelay === 0) {
      this.pieceY += (this.cubeSide + this.border);
      this.pieceYGrid += 1;
      this.downDelay = 3;
    }

    this.pieceCheck("down");

    if (this.upPressed && this.piecePos < 3 && this.rotateDelay === 0) {
      this.piecePos += 1;
      this.rotateDelay = 3;
    } else if (this.upPressed & this.piecePos >= 3 && this.rotateDelay === 0) {
      this.piecePos = 0;
      this.rotateDelay = 3;
    }

    this.pieceCheck("rot");

    this.checkRows();

    this.drawGrid();

  }

  checkRows() {
    for (let row = 0; row < this.sqrsTall; row++) {
      let white = false;
      for (let col = 0; col < this.sqrsAcross; col++) {
        if (this.grid[row][col] === this.emptyColor) {
          white = true;
        }
      }
      if (!white) {
        this.deleteRow(row);
      }
    }
  }

  pieceIntersecting() {
    let intersecting = false;
    for (let idx = 0; idx < 4; idx++) {
      let x = this.piece[this.piecePos][idx][0] + this.pieceXGrid;
      let y = this.piece[this.piecePos][idx][1] + this.pieceYGrid;
      if (y >= this.sqrsTall) {
        intersecting = true;
      } else if (x >= this.sqrsAcross) {
        intersecting = true;
      } else if (x < 0) {
        intersecting = true;
      } else if (this.grid[y][x] != this.emptyColor) {
        intersecting = true;
      }
    }
    return intersecting;
  }

  pieceCheck(direction) {
    if (this.over) {
      return;
    }
    if (this.pieceIntersecting()) {
      if (direction === "left") {
        this.pieceX += (this.cubeSide + this.border);
        this.pieceXGrid += 1;
      } else if (direction === "right") {
        this.pieceX -= (this.cubeSide + this.border);
        this.pieceXGrid -= 1;
      } else if (direction === "down") {
        this.pieceY -= (this.cubeSide + this.border);
        this.pieceYGrid -= 1;
        // only creates a new piece if move would intersect on the bottom
        this.pieceStop();
        this.newPiece();
      } else if (direction === "rot") {
        this.piecePos -= 1;
        if (this.piecePos < 0) {
          this.piecePos = 3;
        }
      }
    }
  }

  pieceStop() {
    for (let idx = 0; idx < 4; idx++) {
      let x = this.piece[this.piecePos][idx][0] + this.pieceXGrid;
      let y = this.piece[this.piecePos][idx][1] + this.pieceYGrid;
      this.grid[y][x] = this.piece.color;
    }
    this.score += this.pieceWorth;
  }

  newPiece() {
    this.drawPiece();
    this.pieceYGrid = 0;
    this.pieceXGrid = Math.floor(Math.random() * (this.sqrsAcross-3));
    this.pieceY = this.outerBorder;
    this.pieceX = (this.pieceXGrid) * (this.cubeSide + this.border) + this.outerBorder;
    this.pieceTimer = 0;
    this.piecePos = 0;
    this.piece = this.nextPiece;
    this.nextPiece = this.pieces[Math.floor(Math.random() * 7)];
    if (this.pieceIntersecting()) {
      this.gameOver();
    }
  }

  deleteRow(row) {
    this.grid.splice(row, 1);
    this.grid.unshift(this.createRow());
    this.numRows += 1;
    this.score += this.rowWorth;
    if (this.numRows % 5 === 0) {
      this.levelUp();
    }
  }

  startGame() {
    document.removeEventListener("click", this.startGame);
    document.addEventListener("click", this.pause);
    this.resetVars();
    this.over = false;
    this.begun = true;
    this.playInterval = setInterval(this.play, 50);
    this.downInterval = setInterval(this.pieceDown, this.speed);
  }

  gameOver() {
    this.over = true;
    document.removeEventListener("click", this.pause);
    clearInterval(this.playInterval);
    clearInterval(this.downInterval);
    document.addEventListener("click", this.startGame, false);
  }

  pieceDown() {
    this.pieceTimer += 1;

    if (this.pieceTimer === 10) {
      this.pieceY += (this.cubeSide + this.border);
      this.pieceYGrid += 1;
      this.pieceTimer = 0;
    }
  }

  pause() {
    document.removeEventListener("click", this.pause);
    document.addEventListener("click", this.resume);
    clearInterval(this.downInterval);
    clearInterval(this.playInterval);
  }

  resume() {
    document.removeEventListener("click", this.resume);
    document.addEventListener("click", this.pause);
    this.playInterval = setInterval(this.play, 50);
    this.downInterval = setInterval(this.pieceDown, this.speed);
  }

  levelUp() {
    if (this.speed > 5) {
      this.speed -= 5;
      clearInterval(this.downInterval);
      this.downInterval = setInterval(this.pieceDown, this.speed);
      this.level += 1;
    }
  }


  keyDownHandler(e) {
    if(e.keyCode == 39) {
      this.rightPressed = true;
    }
    else if(e.keyCode == 37) {
      this.leftPressed = true;
    }
    else if(e.keyCode == 38) {
      this.upPressed = true;
    }
    else if(e.keyCode == 40) {
      this.downPressed = true;
    }
  }

  keyUpHandler(e) {
    if(e.keyCode == 39) {
      this.rightPressed = false;
    }
    else if(e.keyCode == 37) {
      this.leftPressed = false;
    }
    else if(e.keyCode == 38) {
      this.upPressed = false;
    }
    else if(e.keyCode == 40) {
      this.downPressed = false;
    }
  }

}

game = new Game();


/***/ })
/******/ ]);