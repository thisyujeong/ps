/**
 * 분할정복 문제(재귀)
 * 색종이를 4분면으로 나누어 하나의 컬러로 이루어졌는지 체크
 * 단색으로 이루어졌다면 해당 컬러 색종이 + 1
 * 단색이 아니라면 또 해당 영역에서 4분할하여 재귀 실행
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input.shift();
const paper = input.map((line) => line.split(' ').map(Number));

let white = 0;
let blue = 0;

function isSolidColor(r, c, n) {
  const color = paper[r][c];
  for (let i = r; i < r + n; i++) {
    for (let j = c; j < c + n; j++) {
      if (paper[i][j] !== color) {
        return false;
      }
    }
  }
  return true;
}

function quadrant(r, c, n) {
  const color = paper[r][c];
  const isSolid = isSolidColor(r, c, n);

  if (isSolid) {
    if (color === 0) white++;
    else blue++;
    return;
  }

  const half = n / 2;
  quadrant(r, c, half); // 1사분면
  quadrant(r, c + half, half); // 2사분면
  quadrant(r + half, c, half); // 3사분면
  quadrant(r + half, c + half, half); // 4사분면
}

quadrant(0, 0, N);
console.log(white);
console.log(blue);
