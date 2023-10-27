/**
N자리 이친수 개수를 구하는 프로그램, N(1 ≤ N ≤ 90)
- 0으로 시작하지 않는다.
- 1이 두번 연속 나타나지 않는다. ex. 11 불가능

- 규칙 위배 - 0010101, 101101 
- 규칙 준수 - 1, 10, 100, 101, 1000, 1001, ... 

자리수가 높아질수록 이친수의 개수가 정수 자료형이 감당할 수 있는 수를 초과하게 됨
따라서 큰 정수를 표현할 수 있도록 BigInt 내장 함수 사용
 */

const N = +require('fs').readFileSync('./input.txt').toString().trim();
const dp = new Array(N + 1).fill(0);
dp[1] = 1;

for (let i = 2; i <= N; i++) {
  dp[i] = BigInt(dp[i - 1]) + BigInt(dp[i - 2]);
}

console.log(String(dp[N]));
