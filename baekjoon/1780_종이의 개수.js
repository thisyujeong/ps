const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input.shift();
const paper = input.map((line) => line.split(' ').map(Number));

const count = [0, 0, 0]; // [-1로 채워진 종이개수, 0으로 채워진 종이개수, 1로 채워진 종이 개수]

function recrusion(n, x, y) {
  const num = paper[y][x]; // 채워진 숫자
  let numCount = 0; // num으로 채워진 숫자의 개수

  // 채워진 수가 같은지 확인하기 위한 반복문
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (paper[y + j][x + i] === num) numCount++;
      else break;
    }
  }

  // 채워진 수가 같다면 num으로 채워진 종이 개수 증가
  if (numCount === n * n) {
    count[num + 1]++;
    return;
  }

  // 채워진 수가 같지 않다면 종이를 9분할하여 반복(재귀)
  // 가로 3분할 * 세로 3분할 = 총 9분할
  n /= 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      recrusion(n, x + i * n, y + j * n);
    }
  }
}

recrusion(N, 0, 0);

console.log(count.join('\n'));
