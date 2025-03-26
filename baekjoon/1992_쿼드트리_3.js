/* 250326 (3day) */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input.shift();
let tree = '';

const checkCompressible = (r, c, n) => {
  let val = input[r][c];
  for (let i = r; i < r + n; i++) {
    for (let j = c; j < c + n; j++) {
      if (input[i][j] !== val) return false;
    }
  }
  return true;
};

const compressing = (r, c, n) => {
  const val = input[r][c];
  const isCompressed = checkCompressible(r, c, n);
  let half = n / 2;

  if (isCompressed) {
    tree += val;
    return;
  }

  tree += '(';
  compressing(r, c, half);
  compressing(r, c + half, half);
  compressing(r + half, c, half);
  compressing(r + half, c + half, half);
  tree += ')';
};

compressing(0, 0, N);

console.log(tree);
