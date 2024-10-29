/**
 * DP 문제
 *
 * step[] - 각 계단별 점수를 담은 배열
 * dp[] - i번째 계단까지의 최대 값을 메모제이션
 *
 * <경우의 수>
 * 현재 계단을 i라고 할때
 * 1. i번째 계단과, 두 칸 아래의 i-2번째 계단을 밟은 경우
 * 2. i번째 계단과, 한 칸 아래의 i-1번째 계단을 밟은 경우, 연속으로 3개의 계단을 밟을 수 없으므로
 *    i-3번째 계단까지의 최댓값을 '기준'으로 i-1번과 i번 계단의 점수를 합해야함
 *
 * <점화식>
 * dp[i] = Math.max(dp[i-2] + step[i], dp[i-3] + step[i-1] + step[i]);
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift(); // 계단의 총 개수, n <= 300
const step = input.map(Number); // 계단에 쓰여있는 점수, steps[i] <= 10,000
const dp = new Array(n).fill(0);

dp[0] = step[0];
dp[1] = step[0] + step[1];
dp[2] = Math.max(step[1] + step[2], dp[0] + step[2]);

for (let i = 3; i < n; i++) {
  dp[i] = Math.max(dp[i - 2] + step[i], dp[i - 3] + step[i - 1] + step[i]);
}

console.log(dp[n - 1]); // 얻을 수 있는 총 점수의 최댓값
