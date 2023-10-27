/* 
  1. 시도한 코드 - 오답 X, 배열로 인해 처리 시간이 오래걸림
  스티커 2xN에서 한 열을 기준으로 살펴볼 때 세가지 경우의 수가 있음
  - 스티커를 아무것도 떼지 않은 경우
  - 스티커를 1행만 뗀 경우
  - 스티커를 2행만 뗀 경우

  총 세가지 경우의 수로 나누어 볼 수 있으므로 dp를 이차원 배열로 구성
  - dp[n][0] = 아무것도 떼지 않으므로, n - 1열까지의 상태 값
  - dp[n][1] = n - 1열까지의 누적 값 + n열 1행 값
  - dp[n][2] = n - 1열까지의 누적 값 + n열 2행 값

  n = 1일 경우 (top은 스티커의 1행, bottom은 스티커의 2행),
  dp[1][0] = 0;
  dp[1][1] = top[0];
  dp[1][2] = bottom[0];
  
  n = 2일 경우,
  dp[2][0] = 2열에서 아무것도 떼지 않을 것이므로, 1열에서 어떤 것을 떼도(떼지 않아도) 상관없다.
          = Math.max(dp[1][0], dp[1][1], dp[1][2]);
  dp[2][1] = 2열에서 1행 스티커를 떼야하므로, 1열에서는 떼지 않거나 2행 스티커를 떼야함
          = Math.max(dp[1][0], dp[1][2]) + top[2];
  dp[2][2] = 2열에서 2행 스티커를 떼야하므로, 1열에서는 떼지 않거나 1열 스티커를 떼야함
          = Math.max(dp[2][0], dp[2][2]) + bottom[2];

  따라서 점화식으로 나타내면
  dp[n][0] = Math.max(dp[n-1][0], dp[n-1][1], dp[n-1][2]);
  dp[n][1] = Math.max(dp[n-1][0], dp[n-1][2]) + top[n];
  dp[n][2] = Math.max(dp[n-1][0], dp[n-1][1]) + bottom[n];
 */

/* const [T, ...input] = require('fs').readFileSync('./input.txt').toString().split('\n');

let t = [];
for (let i = 0; i < T; i++) {
  t.push([
    input[i * 3 + 1].split(' ').map(Number),
    input[i * 3 + 2].split(' ').map(Number),
  ]);
}

t.map(([top, bottom]) => {
  const len = top.length;
  const dp = [[0, top[0], bottom[0]]];

  for (let i = 1; i < len; i++) {
    dp[i] = [
      Math.max(...dp[i - 1]),
      Math.max(dp[i - 1][0], dp[i - 1][2]) + top[i],
      Math.max(dp[i - 1][0], dp[i - 1][1]) + bottom[i],
    ];
  }
  console.log(Math.max(...dp[len - 1]));
}); */

/* 2. 다른 사람 코드 분석 후 개선한 코드 */
const [T, ...input] = require('fs').readFileSync('./input.txt').toString().split('\n');

let t = [];
for (let i = 0; i < T; i++) {
  t.push([
    input[i * 3 + 1].split(' ').map(Number),
    input[i * 3 + 2].split(' ').map(Number),
  ]);
}

t.map(([top, bottom]) => {
  const len = top.length;

  for (let n = 1; n < len; n++) {
    // 예로, top 행을 살펴볼 때
    // top[n - 1]이 더 클 경우, top[n]은 자동적으로 스티커를 떼지 않는 것이 됨
    // 때문에 굳이 스티커를 떼지 않는 상황을 고려해서 배열(위에서 dp)을 생성할 필요가 없음
    top[n] = Math.max(top[n - 1], bottom[n - 1] + top[n]);
    bottom[n] = Math.max(bottom[n - 1], top[n - 1] + bottom[n]);
  }

  console.log(Math.max(top[len - 1], bottom[len - 1]));
});
