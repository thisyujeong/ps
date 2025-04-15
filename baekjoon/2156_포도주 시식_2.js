/*
입력: 포도주 잔 개수 n, n개의 포도주 잔에 든 포도주 양

로직: dp 다이나믹 프로그래밍
    i를 기준으로,
      1. dp[i-3] + wine[i-1] + [wine[i] ==> 세칸 전에 마시고, 건너띄고, 이전칸과 현재 칸 마시기 OXOO
      2. dp[i-2] + wine[i] ==> 두칸 전에 마시고, 건너띄고, 현재 칸 마시기 OXO
      3. dp[i-1] ==>  마시지 않기 OX

    점화식 dp[i] =  Math.max(1번, 2번, 3번);

출력: 최대로 마실 수 있는 포도주의 양을 출력한다.
*/
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift(); // 포도주 잔의 개수
const wine = input.map(Number); // 포도주 잔에 든 포도주의 양

const dp = Array(n).fill(0);
dp[0] = wine[0];
dp[1] = wine[0] + wine[1];
dp[2] = Math.max(wine[0] + wine[2], wine[1] + wine[2], dp[1]);

for (let i = 3; i < n; i++) {
  dp[i] = Math.max(dp[i - 3] + wine[i - 1] + wine[i], dp[i - 2] + wine[i], dp[i - 1]);
}
console.log(dp[n - 1]);
