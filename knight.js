class Knight {
  constructor() {}
  getMoves = function (x, y) {
    const knightMoves = [
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, 1],
      [-2, -1],
      [-1, 2],
      [1, 2],
    ];
    const result = [];
    for (let i = 0; i < knightMoves.length; i++) {
      const checkX = x + knightMoves[i][0];
      const checkY = y + knightMoves[i][1];
      if (checkX > -1 && checkY > -1 && checkX < 8 && checkY < 8) {
        result.push(knightMoves[i]);
      }
    }
    return result;
  };
}

// Defines a class Square which we will use to create
// objects representing squares on chessboard
class Square {
  constructor(x, y) {
    x = x || 0; // converts falsey values to 0 (in this case, NaN)
    this.xy = [x, y];
    this.knightConnections = [];
    this.piece = null;
    this.populated = false;
    this.prev = null;
    this.visited = false;
    this.depth = -1;
  }
}

// Creates an array representing the the chessboard
function buildBoard() {
  const array = [];
  for (let i = 0; i < 8; i += 1) {
    const x = i;
    const xArray = [];
    for (let index = 0; index < 8; index++) {
      const y = index;
      const sq = new Square(x, y);
      xArray.push(sq);
    }
    array.push(xArray);
  }
  return array;
}

function populateKnightNodes([x, y]) {
  const square = this.board[x][y];
  const legalMoves = this.knight.getMoves(x, y);
  if (square.populated === false) {
    square.populated = true;
    const nextSquares = [];
    for (let i = 0; i < legalMoves.length; i++) {
      const squareToPush =
        this.board[x + legalMoves[i][0]][y + legalMoves[i][1]];
      nextSquares.push([x + legalMoves[i][0], y + legalMoves[i][1]]);
      square.knightConnections.push(squareToPush);
    }
    for (let i = 0; i < nextSquares.length; i++) {
      const element = nextSquares[i];
      this.populateKnightNodes(element);
    }
  }
}

function returnNodeFromCoord([x, y]) {
  const node = board.board[x][y];
  return node;
}

function getPath(start, end) {
  start.prev = null;
  let currNode = end;
  let result = [];
  result.push(currNode.xy);
  while (currNode.prev !== null) {
    currNode = currNode.prev;
    result.push(currNode.xy);
  }
  result = result.reverse();
  let output = `You made it in ${result.length - 1} moves! Here's your path: `;
  for (let i = 0; i < result.length; i++) {
    if (i === 0) {
      output = output + JSON.stringify(result[i]);
    } else {
      output = output + ` -> ${JSON.stringify(result[i])}`;
    }
  }
  return output;
}

function findShortestPath(start, end) {
  const startNode = returnNodeFromCoord(start);
  const endNode = returnNodeFromCoord(end);
  startNode.depth = 0;
  let queue = [startNode];
  let result = [];
  let output = '';
  while (queue.length != 0) {
    let node = queue.pop();
    if (!node.visited) {
      node.visited = true;
      result.push(node.xy);
      for (let index = 0; index < node.knightConnections.length; index++) {
        const element = node.knightConnections[index];
        if (!node.depth > element.depth && element.prev !== node) {
          element.prev = node;
          element.depth = node.depth + 1;
        }
        if (element.xy === endNode.xy) {
          result.push(element.xy);
          output = this.getPath(startNode, element);
          return output;
        }
        queue.unshift(element);
      }
    }
  }
}

class Board {
  constructor(knight) {
    this.board = buildBoard();
    this.knight = knight;
    this.populateKnightNodes = populateKnightNodes;
    this.populateKnightNodes([0, 0], this.board);
    this.findShortestPath = findShortestPath;
    this.returnNodeFromCoord = returnNodeFromCoord;
    this.getPath = getPath;
  }
}

const newKnight = new Knight();
const board = new Board(newKnight);

console.log(board.findShortestPath([6, 7], [6, 3]))
