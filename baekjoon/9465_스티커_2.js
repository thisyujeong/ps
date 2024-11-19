/* DP문제 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const t = +input.shift();

let answer = '';
for (let i = 0; i < t; i++) {
  const n = +input[i * 3];
  const sticker = [
    input[i * 3 + 1].split(' ').map(Number),
    input[i * 3 + 2].split(' ').map(Number),
  ];

  for (let j = 1; j < n; j++) {
    sticker[0][j] = Math.max(sticker[0][j - 1], sticker[1][j - 1] + sticker[0][j]);
    sticker[1][j] = Math.max(sticker[1][j - 1], sticker[0][j - 1] + sticker[1][j]);
  }

  answer += Math.max(sticker[0][n - 1], sticker[1][n - 1]) + '\n';
}

console.log(answer);
