/* 경우의 수 
⓵ n = 1일 경우 가능한 조합 
  1
⓶ n = 2일 경우 가능한 조합 
  1 + 1, 
  2
⓷ n = 3일 경우 가능한 조합 
  1 + 1 + 1, 
  1 + 2, 
  2 + 1, 
  3

추가로 n = 4일때 가능한 경우의 수를 살펴보면 다음과 같음
⓵ 에 추가된 조합
  1 + 3
⓶ 에 추가된 조합
  1 + 1 + 1, 
  2 + 1
⓷ 에 추가된 조합
  1 + 1 + 1 + 1
  1 + 2 + 1
  2 + 1 + 1
  3 + 1

따라서 점화식으로 나타내면 
dp[n] = dp[n-1] + dp[n-2] + dp[n-3];
 */

const [n, ...input] = require('fs')
  .readFileSync('./input.txt')
  .toString()
  .trim()
  .split('\n');
const dp = new Array(12).fill(0);
dp[1] = 1;
dp[2] = 2;
dp[3] = 4;

input.map((v) => {
  const num = parseInt(v);
  for (let j = 4; j <= num; j++) {
    dp[j] = dp[j - 1] + dp[j - 2] + dp[j - 3];
  }
  console.log(dp[num]);
});
