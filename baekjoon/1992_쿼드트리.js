const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const board = input.map((line) => line.split('').map(Number));
const quadTree = [];

const genQuadTree = (n, x, y) => {
  const num = board[y][x];
  let isCompressed = true;

  // 압축이 필요한 상태인지 이미 최대로 압축된 상태인지 확인
  // isComporessed = true - 이미 최대로 압축된 상태.
  // isComporessed = false - 압축이 필요한 상태
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[y + i][x + j] !== num) {
        isCompressed = false;
        break;
      }
    }
  }

  // 해당 구역이 최대로 압축된 상태라면 quadTree에 추가
  if (isCompressed) {
    quadTree.push(num);
  } else {
    // 압축이 필요한 상태라면 4분할하여 재귀함수 수행
    n /= 2; // 가로, 세로를 2로 나눔으로써 board를 4분할
    quadTree.push('(');
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        genQuadTree(n, x + j * n, y + i * n);
      }
    }
    quadTree.push(')');
  }
};

genQuadTree(n, 0, 0);
console.log(quadTree.join(''));
