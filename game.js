
const Pieces = require('./pieces.js');
const DrawingFunctions = require('./draw.js');

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
