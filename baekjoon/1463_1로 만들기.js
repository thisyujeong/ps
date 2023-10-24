/* 처음 시도했던 솔루션 (오답)
1에 가장 빠르게 접근할 수 있는 연산 순으로 풀이하면 된다고 생각했음.
먼저 3으로 나누고, 2로 나누고, 안되면 1로 나누고, ...

그러나 10의 경우 10 - 9 - 3 - 1 로
총 3번만에 1을 만들 수 있으니 이 방법은 오답

while (num > 1) {
  count++;
  if (num % 3 === 0) num /= 3;
  else if (num % 2 === 0) num /= 2;
  else num -= 1;
}
console.log(calc(num));
*/

/* 
생각해볼 수 있는 솔루션 
재귀호출 의심 -> DP
10이 주어졌을 경우, 다음과 같이 경우의 수를 따져볼 수 있음
- ⓵ (1을 뺀 값 9를 만드는 최소 횟수) + 1
- ⓶ (2로 나눈 값 5를 1로 만드는 최소횟수) + 1
- 3은 나누어 떨어지지 않으므로 불가

위 두가지를 비교하여 더 적은 경우를 찾음
⓵ 점화식은 DP[i] = DP[i - 1] + 1;
⓶ 점화식은 DP[i] = DP[i/2] + 1;
 */
const n = +require('fs').readFileSync('./input.txt').toString().trim();
const dp = new Array(n + 1).fill(0);

for (let i = 2; i <= n; i++) {
  dp[i] = dp[i - 1] + 1;

  if (i % 3 === 0) {
    dp[i] = Math.min(dp[i], dp[i / 3] + 1);
  }
  if (i % 2 === 0) {
    dp[i] = Math.min(dp[i], dp[i / 2] + 1);
  }
}

console.log(dp[n]);
