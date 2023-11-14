/**
 * 큰 정수를 표현할 수 있도록 BigInt 내장 함수 사용
 *
 * RangeError: Division by zero 에러 발생
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/BigInt_division_by_zero
 * BigInt 값을 나누는 연산을 할 때 0이 아닌지 확인하는 절차가 필요
 */

const input = require('fs').readFileSync('./input.txt').toString().trim();
const [a, b] = input.split(' ').map(BigInt);

const gcd = (a, b) => {
  while (b > 0 && a % b) {
    let c = a % b;
    a = b;
    b = c;
  }
  return Number(b);
};

console.log('1'.repeat(gcd(a, b)));
