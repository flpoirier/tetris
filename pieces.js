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

var long = {};
long[0] = [[0,1],[1,1],[2,1],[3,1]];
long[1] = [[2,0],[2,1],[2,2],[2,3]];
long[2] = [[0,2],[1,2],[2,2],[3,2]];
long[3] = [[1,0],[1,1],[1,2],[1,3]];
long.color = "green";

var ell1 = {};
ell1[0] = [[1,0],[1,1],[1,2],[0,2]];
ell1[1] = [[0,0],[0,1],[1,1],[2,1]];
ell1[2] = [[1,0],[2,0],[1,1],[1,2]];
ell1[3] = [[0,1],[1,1],[2,1],[2,2]];
ell1.color = "orange";

var ell2 = {};
ell2[0] = [[1,0],[1,1],[1,2],[2,2]];
ell2[1] = [[0,1],[1,1],[2,1],[0,2]];
ell2[2] = [[0,0],[1,0],[1,1],[1,2]];
ell2[3] = [[2,0],[0,1],[1,1],[2,1]];
ell2.color = "yellow";

var square = {};
square[0] = [[0,0],[1,0],[0,1],[1,1]];
square[1] = [[0,0],[1,0],[0,1],[1,1]];
square[2] = [[0,0],[1,0],[0,1],[1,1]];
square[3] = [[0,0],[1,0],[0,1],[1,1]];
square.color = "#FF69B4"; // pink

var zag1 = {};
zag1[0] = [[1,1],[2,1],[0,2],[1,2]];
zag1[1] = [[0,0],[0,1],[1,1],[1,2]];
zag1[2] = [[1,0],[2,0],[0,1],[1,1]];
zag1[3] = [[1,0],[1,1],[2,1],[2,2]];
zag1.color = "purple";

var tee = {};
tee[0] = [[0,1],[1,1],[2,1],[1,2]];
tee[1] = [[1,0],[0,1],[1,1],[1,2]];
tee[2] = [[1,0],[0,1],[1,1],[2,1]];
tee[3] = [[1,0],[1,1],[1,2],[2,1]];
tee.color = "red";

var zag2 = {};
zag2[0] = [[0,1],[1,1],[1,2],[2,2]];
zag2[1] = [[1,0],[0,1],[1,1],[0,2]];
zag2[2] = [[0,0],[1,0],[1,1],[2,1]];
zag2[3] = [[2,0],[1,1],[2,1],[1,2]];
zag2.color = "blue";

var pieces = [long, ell1, ell2, square, zag1, tee, zag2];

module.exports = pieces;
