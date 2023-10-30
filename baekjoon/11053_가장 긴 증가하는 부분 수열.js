/* 
  시도했던 풀이(오답)
  주어진 수열을 a라고 할 때, a[i]값과 a[i-1] 값만의 크고 작음을 비교하여 a[i]가 클 경우
  dp[i]는 dp[i-1]값에 1을 더해준 값을 저장하고, 그렇지 않다면 dp[i-1] 값을 그대로 저장하도록 했다.
  그리고 가장 마지막 dp 값이 가장 긴 수열의 길이가 된다고 생각했다.
  
  오답의 원인을 찾아보자.

  [반례]
  4
  10 20 10 20

  문제에서 주어진 예제의 경우 문제없이 진행되었지만 다음과 같은 반례의 경우
  가장 긴 수열은 2임을 눈으로 보기만해도 알 수 있는데, 그렇다면 dp는 다음과 같이 저장되어야 할 것이다.
  dp = [ 1, 2, 1, 2 ];

  시도했던 풀이는 a[i]값과 a[i-1] 값만의 크고 작음을 비교하고, 
  dp[i]값을 dp[i-1]값에서 무조건적으로 증가만 시켜주기 때문에 다음과 같이 오답처리가 된다.
  dp = [ 1, 2, 2, 3 ];
 */

/* 
  const [N, input] = require('fs').readFileSync('./input.txt').toString().split('\n');
  const n = parseInt(N);
  const a = input.split(' ').map(Number);
  const dp = new Array(n).fill(1);

  for (let i = 1; i < N; i++) {
    dp[i] = a[i - 1] < a[i] ? dp[i - 1] + 1 : dp[i - 1];
  }
  console.log(dp[n-1]);
*/

/*
  수정한 풀이
  수열의 각 원소들을 순회하는 이중 반복문을 실행한다.
  각 원소는 해당 원소의 이전의 값들과 비교하여 증가하는 수열의 길이를 찾아내 dp에 저장하고,
  dp의 최대값을 출력한다.
 */
const [N, input] = require('fs').readFileSync('./input.txt').toString().split('\n');
const n = parseInt(N);
const a = input.split(' ').map(Number);
const dp = new Array(n).fill(1);

for (let i = 0; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (a[j] < a[i] && dp[i] < dp[j] + 1) {
      dp[i] = dp[j] + 1;
    }
  }
}
console.log(Math.max(...dp));
