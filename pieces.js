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
