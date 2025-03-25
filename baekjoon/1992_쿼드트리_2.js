/* 250325 (1h) */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input.shift();
const quadTree = [];

const isCompressible = (r, c, n) => {
  for (let i = r; i < r + n; i++) {
    for (let j = c; j < c + n; j++) {
      if (input[i][j] !== input[r][c]) return false;
    }
  }
  return true;
};

const getQuadTree = (r, c, n) => {
  const val = input[r][c];
  const isCompressed = isCompressible(r, c, n);
  let half = n / 2;

  if (isCompressed) {
    quadTree.push(val);
    return;
  }

  quadTree.push('(');
  getQuadTree(r, c, half);
  getQuadTree(r, c + half, half);
  getQuadTree(r + half, c, half);
  getQuadTree(r + half, c + half, half);
  quadTree.push(')');
};

getQuadTree(0, 0, N);
console.log(quadTree.join(''));
