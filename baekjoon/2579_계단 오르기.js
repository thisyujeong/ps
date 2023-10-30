/**
 * nums는 각 계단의 값, dp는 오른 계단의 최댓값, 현재 오른 계단을 n번째라고 가정
 * 마지막 계단은 무조건 올라야하므로(중요) n번째 계단을 중심으로 다음 경우의 수를 찾을 수 있음
 * 2. n번쨰 계단의 값 + n-2번째 계단까지의 최댓값
 * 1. n번째 계단의 값 + n-1번째 계단의 값 + 연속으로 3개의 계단을 오를 수 없으므로 n-3번째 계단까지의 최댓값
 *
 * 위 두가지의 경우의 수를 도출할 수 있고, 두 경우의 최댓값을 dp에 저장하여 메모제이션 함
 * 따라서 다음 점화식으로 나타내면 다음과 같이 나타낼 수 있음.
 *
 * dp[n] = Math.max(nums[n] + dp[n-2], nums[n] + nums[n-1] + dp[n-3]);
 */
const [n, ...nums] = require('fs')
  .readFileSync('./input.txt')
  .toString()
  .split('\n')
  .map(Number);

const dp = new Array(n).fill(0);

dp[0] = nums[0];
dp[1] = nums[0] + nums[1];
dp[2] = Math.max(nums[1] + nums[2], nums[2] + dp[0]);

for (let i = 3; i < n; i++) {
  dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 3] + nums[i - 1] + nums[i]);
}

console.log(dp[n - 1]);
