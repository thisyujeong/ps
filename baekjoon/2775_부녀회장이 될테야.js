/**
 * DP 문제
 * k = 층수, n = 호수 / 층은 0부터, 호수는 1부터
 * 점화식: DP[k][n] = DP[k-1][n] + DP[k][n-1]
 * DP[0][n] = n
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const T = +input.shift();
const apt = Array.from(Array(15), () => Array(15).fill(0)); // 1 ≤ k, n ≤ 14

for (let i = 0; i < 15; i++) {
  apt[0][i] = i;
}

for (let k = 1; k < 15; k++) {
  for (let n = 1; n < 15; n++) {
    apt[k][n] = apt[k - 1][n] + apt[k][n - 1];
  }
}

for (let i = 0; i < T; i++) {
  const K = +input[i * 2]; // 층
  const N = +input[i * 2 + 1]; // 호
  console.log(apt[K][N]);
}
