const cvs = document.getElementById('tetris');
const ctx = cvs.getContext('2d');
const scoreElement = document.getElementById("score");



const ROW = 20;
const COL = COLUMN = 10;
const SQ = squareSize = 20;
const VACANT = "WHITE" //color of empty square
//draws a square

function drawSquare(x,y,color){
ctx.fillStyle = color;
ctx.fillRect(x*SQ,y*SQ,SQ,SQ);
ctx.strokeStyle = "BLACK";
ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}

//board
let board = [];
for(r = 0; r < ROW; r++){
  board[r] = [];
  for(c = 0; c < COL; c++){
    board[r][c] = VACANT;
  }
}

//drawBoard
function drawBoard(){
  for(r = 0; r < ROW; r++){
    for(c = 0; c < COL; c++){
      drawSquare(c,r,board[r][c]);
    }
  }
}
drawBoard();


//Object piece
function Piece(tetromino,color){
  this.tetromino = tetromino;
  this.color = color;

  this.tetrominoN =0;//start from first pattern

  this.activeTetromino = this.tetromino[this.tetrominoN];
// for controlling
  this.x = 3;
  this.y = -2;
}
//random function

//pieces
const PIECES = [
  [Z,'red'],
  [S,'green'],
  [T,'yellow'],
  [O,'blue'],
  [L,'purple'],
  [I,'cyan'],
  [J,'orange']
];  //initiate a pieces
//draw function for Piece
function randomPiece(){
    let r = randomN = Math.floor(Math.random() * PIECES.length) // 0 -> 6
    return new Piece(PIECES[r][0],PIECES[r][1]);
}

let p = randomPiece();
console.log(p);
Piece.prototype.fill = function(color){
  for(r = 0; r < this.activeTetromino.length; r++){
    for(c = 0; c < this.activeTetromino.length; c++){
      if(this.activeTetromino[r][c]){
        drawSquare(this.x + c, this.y + r, color);
      }
    }
  }
}

Piece.prototype.draw = function(){
  this.fill(this.color);
}

Piece.prototype.unDraw = function(){
  this.fill(VACANT);
}

//movement


Piece.prototype.moveDown = function(){
  if(!this.collison(0,1,this.activeTetromino)){
  this.unDraw();
  this.y++;
  this.draw();
}
else{
  this.lock();
p = randomPiece();}
}

Piece.prototype.moveRight = function(){
  if(!this.collison(1,0,this.activeTetromino)){
  this.unDraw();
  this.x++;
  this.draw();
}
}

Piece.prototype.moveLeft = function(){
  if(!this.collison(-1,0,this.activeTetromino)){
  this.unDraw();
  this.x--;
  this.draw();
}
}
Piece.prototype.rotate = function(){
  let nextPattern = this.tetromino[this.tetrominoN + 1] % this.tetromino.length;
  let kick = 0;
    if(this.collison(0,0,nextPattern)){
      if(this.x > COL / 2){
        kick = -1;
      }else{
        kick = 1;
      }
    }
    if(!this.collison(kick,0,nextPattern)){
      this.unDraw();
      this.x += kick;
      this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
      this.activeTetromino = this.tetromino[this.tetrominoN]
;    }
}
let score = 0;
//lock function
Piece.prototype.lock = function(){
  for(r = 0; r < this.activeTetromino.length; r++){
    for(c = 0; c < this.activeTetromino.length; c++){
      if(!this.activeTetromino[r][c]){
        continue;
      }
      //pieces locked on top (Game over)
      if(this.y + r < 0){
        alert("Game Over");
        gameOver = true; //stops requestAnimationFrame
        break;
      }
      board[this.y + r][this.x + c] = this.color;
    }
  }
  for(r = 0; r < ROW; r++){
    let isRowFull = true;
    for(c = 0; c < COL; c++){
      isRowFull = isRowFull && (board[r][c] != VACANT);
    }
    if(isRowFull){//if row is full need to move all rows above it down
        for(y = r; y > 1; y--){
        for(c = 0; c < COL; c++){
          board[y][c] = board[y-1][c];

        }
        for(c = 0; c < COL; c++){
          board[0][c] = VACANT;
        }
        }
        score += 10
       }
  }
  drawBoard(); //updates the board
    scoreElement.innerHTML = score; //updates the score
}
//collisions
Piece.prototype.collison = function(x,y,piece){
  for(r = 0; r < piece.length; r++){
    for(c = 0; c < piece.length; c++){
      if(!piece[r][c]){
        continue;
      }
      //coordinates after movement
      let newX = this.x + c + x;
      let newY =this.y + r + y;

      //conditions
      if(newX < 0 || newX >= COL || newY >= ROW){
        return true;
      }
      if(newY < 0){
        continue;
      }
      if(board[newY][newX] != VACANT){
        return true;
      }
    }
  }
  return false;
}

//controls
document.getElementById('turn').onclick =
function(){
  p.rotate();
  dropStart = Date.now();
};
document.getElementById("right").onclick =
function(){
  p.moveRight();
  dropStart = Date.now();
};
document.getElementById('down').onclick =
function(){
  p.moveDown();
  dropStart = Date.now();
};
document.getElementById('left').onclick =
function(){
  p.moveLeft();
  dropStart = Date.now();
};
document.addEventListener("keydown",CONTROL);
function CONTROL(event){
  if(event.which == 37){
    p.moveLeft();
    dropStart = Date.now();
  }
   else if(event.which == 38){
    p.rotate();
    dropStart = Date.now();
  }
   else if(event.which == 39){
    p.moveRight();
    dropStart = Date.now();
  }
  else if(event.which == 40){
    p.moveDown();
    dropStart = Date.now();
  }
}
p.draw();
let dropStart = Date.now();
let gameOver = false;
function drop(){

  let now = Date.now();
  let delta = now - dropStart;
  if(delta > 1000){
    p.moveDown();
    dropStart = Date.now();
  }
  if(!gameOver){
     requestAnimationFrame(drop);
   }
}
drop();
