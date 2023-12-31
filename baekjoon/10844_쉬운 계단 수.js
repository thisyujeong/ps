/**
n자리 수 중 마지막 자리의 수를 기준(dp)으로 다음 자리에 올 수 있는 경우의 수를 구하는 문제
먼저, dp[n][i]이라면 n은 자리수가 되고 i는 해당자리 일의자리에 올 수 있는 수를 나타낸다.

한자리 수는 0을 제외한 모든 수가 계단수가 됨
dp[1] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

두자리 수는 한자리수 뒤로 올 수 있는 계단수를 나타냄 
dp[2] = [1, 1, 2, 2, 2, 2, 2, 2, 2, 1];
- dp[2][0] = 한자리수 다음 0이 올 수 있는 계단수는 10뿐이므로 가지수는 1개
- dp[2][1] = 한자리수 다음 1이 올 수 있는 계단수는 21뿐이므로 가지수는 1개
- dp[2][2] = 한자리수 다음 2가 올 수 있는 계단수는 12, 32로 가지수는 2개
- ...
- dp[2][9] = 한자리수 다음 9로 끝나는 수는 89뿐이므로 가지수는 1개
따라서 0과 9를 제외하고, 이전 값과 다음 값의 합 해당 수의 경우의 수가 된다.

세자리 수 까지 살펴보면,
dp[3] = [1, 3, 3, 4, 4, 4, 4, 4, 3, 2];
- dp[3][0] = dp[2][1]뒤에 0이 붙는 경우 가지수 = dp[2][1] = 1
- dp[3][1] = dp[2][0]과 dp[2][2] 뒤에 1이 붙는 경의 가지수 합 = 2
- ...
- dp[3][9] = dp[2][8]뒤에 9가 붙는 경우 가지수 = dp[2][8] = 2

점화식으로 나타내면
⓵ i = 0인 경우, dp[n][i] = dp[n-1][i+1];
⓶ 0 < i < 9인 경우, dp[n][i] = dp[n-1][i-1] + dp[n-1][i+1];
⓷ i = 9인 경우, dp[n][i] = dp[n-1][i-1];
 */

const N = +require('fs').readFileSync('./input.txt').toString().trim();
const div = 1000000000;
const dp = Array.from(new Array(N + 1), () => new Array(10));
dp[1] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

for (let n = 2; n <= N; n++) {
  for (let i = 0; i <= 9; i++) {
    let prev = dp[n - 1][i - 1] || 0;
    let next = dp[n - 1][i + 1] || 0;
    dp[n][i] = (prev + next) % div;
  }
}

let sum = 0;
for (let i = 0; i < 10; i++) {
  sum += dp[N][i];
}

console.log(sum % div);
