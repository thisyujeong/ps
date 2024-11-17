const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number); // N:세로, M:가로
const paper = input.map((v) => v.split(' ').map(Number));

/* 풀이 1 - 브루트포스 */
const tetromino = [
  // bar
  [[1, 1, 1, 1]],
  [[1], [1], [1], [1]],
  // box
  [
    [1, 1],
    [1, 1],
  ],
  // ㄴ
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1],
    [0, 1],
    [0, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 0],
  ],
  [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [1, 1],
    [1, 0],
    [1, 0],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
  ],
  // thunder
  [
    [1, 0],
    [1, 1],
    [0, 1],
  ],
  [
    [0, 1],
    [1, 1],
    [1, 0],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  // ㅜ
  [
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [0, 1],
  ],
];

// 테트로미노가 차지하는 좌표들의 합계구하기
function calculate(block, w, h, r, c) {
  let sum = 0;
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      sum += paper[i + r][j + c] * block[i][j];
    }
  }
  return sum;
}

// 모든 좌표를 탐색하여 최댓값 구하기
function search(block, w, h) {
  let max = 0;
  for (let i = 0; i < N - h + 1; i++) {
    for (let j = 0; j < M - w + 1; j++) {
      max = Math.max(max, calculate(block, w, h, i, j));
    }
  }
  return max;
}

function solution() {
  let answer = 0;
  for (let block of tetromino) {
    const [w, h] = [block[0].length, block.length];
    answer = Math.max(answer, search(block, w, h));
  }
  return answer;
}

console.log(solution());

/* 풀이 2 - DFS */
const visited = Array.from({ length: N }, () => new Array(M).fill(false));
const direction = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

let max = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    visited[i][j] = true;
    dfs(i, j, 1, paper[i][j]);
    visited[i][j] = false;
    restCheck(i, j);
  }
}
console.log(max);

function dfs(r, c, cnt, sum) {
  if (cnt === 4) {
    max = Math.max(max, sum);
    return;
  }

  for (const [dx, dy] of direction) {
    const [nx, ny] = [dx + c, dy + r];
    if (nx >= 0 && ny >= 0 && nx < M && ny < N && !visited[ny][nx]) {
      visited[ny][nx] = true;
      dfs(ny, nx, cnt + 1, sum + paper[ny][nx]);
      visited[ny][nx] = false;
    }
  }
}

// ㅗ, ㅜ, ㅏ, ㅓ
function restCheck(r, c) {
  const blocks = [
    [
      [0, 1],
      [-1, 1],
      [0, 2],
    ], // ㅗ
    [
      [0, 1],
      [1, 1],
      [0, 2],
    ], // ㅜ
    [
      [1, 0],
      [1, 1],
      [2, 0],
    ], // ㅏ
    [
      [1, 0],
      [1, -1],
      [2, 0],
    ], // ㅓ
  ];
  for (let block of blocks) {
    let sum = paper[r][c];
    for (const [dy, dx] of block) {
      const [nx, ny] = [dx + c, dy + r];
      if (nx < 0 || ny < 0 || nx >= M || ny >= N) break;
      sum += paper[ny][nx];
    }
    max = Math.max(max, sum);
  }
}
