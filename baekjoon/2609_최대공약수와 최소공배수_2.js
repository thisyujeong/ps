/**
 * 유클리드 호제법 활용
 * 최대공약수(GCD): 유클리드 호제법
 * a, b(a > b)에 대하여 a를 b로 나눈 나머지가 r일때, a와 b의 최대공약수는 b와 r의 최대공약수와 같다.
 * a % b = r 이 과정을 반복해 나머지(r)가 0이 나올때까지 나누면 그 수가 최대공약수
 *
 * 658 % 232 = 184, 232는 184로 나누어떨어지지 않으므로 다시 나눔
 * 232 % 184 = 48, 184는 48로 나누어떨어지지 않으므로 다시 나눔
 * 184 % 48 = 40, 48은 40으로 나누어떨어지지 않으므로 다시 나눔
 * 48 % 40 = 8, 40은 8로 나누어떨어지므로 r = 0
 *
 * 두 수(658, 232) 최대 공애약수는 8
 *
 * 최소공배수(lcm): a와 b의 최소공배수는 a와 b의 곱을 a와 b의 최대공약수를 나눈것과 같다.
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split(' ');
const a = +input[0];
const b = +input[1];

/* 풀이 1 */
// 최대공약수
function gcd(a, b) {
  let r = 0;
  while (b !== 0) {
    r = a % b;
    a = b;
    b = r;
  }
  return a;
}

// 최소공배수
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}
console.log(gcd(a, b));
console.log(lcm(a, b));

/* 풀이 2 - Brute Force 전체탐색 */
function gcd(a, b) {
  const min = Math.min(a, b);
  let result = 0;
  for (let i = min; i > 0; i--) {
    if (a % i === 0 && b % i === 0) {
      result = i;
      break;
    }
  }
  return result;
}
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}
console.log(gcd(a, b));
console.log(lcm(a, b));
