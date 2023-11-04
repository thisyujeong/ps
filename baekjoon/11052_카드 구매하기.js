/**
  DP는 각 i개의 카드팩을 구하기 위한 금액의 최댓값을 갖는다.
  i의 값에 따라 발생하는 케이스의 패턴을 파악한다.

  (i = 1) 1번째 카드 + 카드 0개를 선택하는 경우

  (i = 2) 1번째 카드 + 카드 1개를 선택하는 경우 (i = 1에서 이미 최댓값을 구함)
          2번째 카드 + 카드 0개를 선택하는 경우
  
  (i = 3) 1번째 카드 + 카드 2개를 선택하는 경우 (i = 2에서 이미 최댓값을 구함)
          2번째 카드 + 카드 1개를 선택하는 경우 (i = 1에서 이미 최댓값을 구함)
          3번째 카드 + 카드 0개를 선택하는 경우 

  각 i개의 최댓값을 dp에 저장하므로 n번째 카드 외, 별도로 선택하는 카드는 이전 dp들의 값에서 구할 수 있음
  예를 들어, i = 2에서 카드 1개를 별도로 선택하는 경우는 이미 i = 1에서 최댓값으로 구해져있기 때문에 dp[1]을 활용할 수 있음
 
  따라서 점화식으로 다음과 같이 표현할 수 있음
  dp[i] = card[j] + dp[i -j];

  최종적으로 금액의 최댓값을 구하는 문제이기 때문에 
  이전에 저장된 dp[i]와 비교하여 더 높은 값을 새로 저장해야함
  dp[i] = Math.max(dp[i], card[j] + dp[i - j]);
 */
const [n, input] = require('fs').readFileSync('./input.txt').toString().split('\n');
const N = parseInt(n);
const cards = input.split(' ').map(Number);
const dp = new Array(N + 1).fill(0);

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= i; j++) {
    dp[i] = Math.max(dp[i], dp[i - j] + cards[j - 1]);
  }
}

console.log(dp[n]);
