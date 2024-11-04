/**
 * TODO: 복습필요
 * 1. 브루트 포스 (완전탐색)
 * 2. 다이나믹 프로그래밍(DP)
 * 이 문제는 시간을 0.5초로 제한했다. 보통 1초에 연산을 1억번 한다고 가정한다.
 * 즉 5천만번의 연산이 가능하다는 추론을 할 수 있다. 여기서 주어진 n의 범위는 1 ≤ n ≤ 50,000 (5 * 10^4) 이다.
 * 이를 2번만 반복해도 50,000 * 50,000 = 25억번의 연산이 필요하며 시간초과가 발생할 것이다.
 * 따라서 DP 알고리즘으로 풀이하여 시간복잡도를 낮춘다.
 *
 * 점화식: dp[i] = Math.min(dp[i], dp[i - k * k] + 1)
 */
const n = +require('fs').readFileSync('./input.txt').toString().trim();
const dp = new Array(n + 1).fill(0);
dp[1] = 1;

for (let i = 2; i < n + 1; i++) {
  let min = Infinity;

  // 최소 개수의 제곱수 찾기
  // 제곱수가 자신의 값(i)를 초과하면 그 제곱수로 자신을 뺄 수 없음 => 최소한의 개수 접근 X
  for (let k = 1; k * k <= i; k++) {
    min = Math.min(min, dp[i - k * k]);
  }

  dp[i] = min + 1;
}

console.log(dp[n]);
