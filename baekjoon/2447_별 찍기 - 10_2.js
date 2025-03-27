/* 250327 (1day, 30m) */
const n = +require('fs').readFileSync('./input.txt').toString().trim();
let result = '';

const drawStar = (row, col, n) => {
  if (row % 3 === 1 && col % 3 === 1) {
    result += ' ';
  } else {
    if (n === 1) result += '*';
    else drawStar(Math.floor(row / 3), Math.floor(col / 3), Math.floor(n / 3));
  }
};

for (let r = 0; r < n; r++) {
  for (let c = 0; c < n; c++) {
    drawStar(r, c, n);
  }
  result += '\n';
}

console.log(result);
