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
