const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const paper = input.map((line) => line.split(' ').map(Number)); // 0: white, 1: blue

let white = 0;
let blue = 0;

const checkSolidPaper = (r, c, n) => {
  const color = paper[r][c];
  for (let i = r; i < r + n; i++) {
    for (let j = c; j < c + n; j++) {
      if (color !== paper[i][j]) return false;
    }
  }
  return true;
};

const makePaper = (r, c, n) => {
  const color = paper[r][c];
  const isSolidPaper = checkSolidPaper(r, c, n);
  const half = n / 2;

  if (isSolidPaper) {
    color === 0 ? white++ : blue++;
    return;
  }

  if (!isSolidPaper) {
    makePaper(r, c, half);
    makePaper(r, c + half, half);
    makePaper(r + half, c, half);
    makePaper(r + half, c + half, half);
  }
};

makePaper(0, 0, n);

console.log(white);
console.log(blue);
