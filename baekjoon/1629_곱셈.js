/**
 * 1. 분할정복을 이용한 거듭제곱
 * 2^11 을 구하는 경우 2를 11번 곱하는 방식으로 구할 수도 있지만(11번 연산)
 * > 2^11 = 2^5 * 2^5 * 2
 * > 2^5 = 2^2 * 2^2  * 2
 * > 2^2 = 2 * 2
 *
 * 다음과 같이 세 번의 연산으로도 구할 수 있음
 * (n이 짝수인 경우) A^n = A^{n/2} * A^{n/2}
 * (n이 홀수인 경우) A^n = A^{(n-1)/2} * A^{(n-1)/2} * A
 *
 * 그러나 이 문제에서는 수가 매우 커질 수 있음 --> overflow!
 * C로 나눈 나머지를 구해야 한다.
 * -> 분할정복과 모듈러 연산 성질 이용
 *
 * 2. 모듈러 연산의 성질을 이용
 * 모듈러 산술연산의 특징: 분배 법칙이 성립한다
 * (A + B) % C =  ((A % C) + (B % C)) % C
 * (A * B) % C = ((A % C) * (B % C)) % C
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split(' ');
const [A, B, C] = input.map(BigInt); // 2,147,483,647이하의 자연수 (2^31)

function pow(a, b) {
  if (b === 1n) return a % C;

  // 짝수인 경우
  if (b % 2n === 0n) {
    let mod = pow(a, b / 2n) % C;
    return (mod * mod) % C;
  }

  // 홀수인 경우
  if (b % 2n === 1n) {
    let mod = pow(a, (b - 1n) / 2n) % C;
    return (((mod * mod) % C) * a) % C;
  }
}

console.log(pow(A, B).toString());
