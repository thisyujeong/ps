/* 
  뒤에서 두 수의 조합이 가능한 경우와 불가능한 경우로 분기 처리

  0에 대해 필요한 처리
  - 맨 앞에 0이 오는 경우 해석할 수 없음 (0)
  - 0 이 연속으로 오는 경우 해석할 수 없음 (0)
  - 0 앞에 3이상의 값이 오는 경우 해석할 수 없음 (0)
  - 0 앞에 1, 2가 오는 경우 이전 dp 의 수와 같음

  하루하고 반나절동안 풀었음(ㅠㅠ)
 */
const fs = require('fs');
const num = fs.readFileSync('./input.txt').toString().trim().split('').map(Number);
const len = num.length;
const mod = 1000000;
const dp = new Array(len).fill(1);

function solve() {
  if (num[0] === 0) return 0; // 맨 앞자리가 0인경우 경우의 수는 0

  for (let i = 1; i < len; i++) {
    /* 뒤의 두 수를 조합함
    ex. 1312 가 주어질 때, i = 2이라면  3과 1을 조합해 31로 만듦 */
    let doubleDigit = num[i - 1] * 10 + num[i];

    // 0이 연속으로 오는 경우
    if (doubleDigit === 0) return 0;

    // 뒤의 두 수를 조합할 수 있는 경우
    if (10 <= doubleDigit && doubleDigit <= 26) {
      // 0 앞에 1, 2가 오는 경우
      if (num[i] === 0) {
        dp[i] = (dp[i - 2] || 1) % mod;
        continue;
      }
      dp[i] = (dp[i - 1] + (dp[i - 2] || 1)) % mod;
    }
    // 두수의 조합이 불가능하거나 26(Z)보다 큰 경우
    else {
      // 0 앞에 3이상의 수가 오는 경우
      if (num[i] === 0) return 0;
      dp[i] = dp[i - 1] % mod;
    }
  }

  return dp[len - 1];
}

console.log(solve());
