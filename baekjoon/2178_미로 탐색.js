const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [row, col] = input.shift().split(' ').map(Number);

const maze = input.map((line) => line.split('').map(Number));
const board = Array.from(Array(row), () => new Array(col).fill(1));
const ds = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

console.log(minDistance(0, 0));

// bfs
function minDistance(x, y) {
  const queue = [[x, y]];

  while (queue.length) {
    const [cx, cy] = queue.shift();

    for (let k = 0; k < ds.length; k++) {
      const nx = cx + ds[k][0];
      const ny = cy + ds[k][1];

      if (rangeCheck(nx, ny) && maze[ny][nx] === 1) {
        maze[ny][nx] = 0; // 방문처리
        queue.push([nx, ny]);
        board[ny][nx] = board[cy][cx] + 1;
      }
    }
  }

  return board[row - 1][col - 1];
}

function rangeCheck(x, y) {
  if (x >= 0 && x < col && y >= 0 && y < row) return true;
  return false;
}
