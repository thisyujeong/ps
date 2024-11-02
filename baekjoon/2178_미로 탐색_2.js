const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, m] = input.shift().split(' ').map(Number);
const maze = input.map((row) => row.split('').map(Number));
const visited = Array.from({ length: n }, () => new Array(m).fill(0));
const direction = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function bfs(x, y) {
  const queue = [[x, y]];
  visited[y][x] = 1;

  while (queue.length) {
    const [cx, cy] = queue.shift();

    for (let [dx, dy] of direction) {
      const [nx, ny] = [cx + dx, cy + dy];
      if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
        if (!visited[ny][nx] && maze[ny][nx] === 1) {
          queue.push([nx, ny]);
          visited[ny][nx] = visited[cy][cx] + 1;
        }
      }
    }
  }
  return visited[n - 1][m - 1];
}

console.log(bfs(0, 0));
