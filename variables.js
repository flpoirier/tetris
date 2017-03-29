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

var pieces = require('./pieces.js');
var piece = pieces[Math.floor(Math.random() * 7)];
