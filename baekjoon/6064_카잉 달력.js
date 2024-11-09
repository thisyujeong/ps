const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const T = +input.shift();

for (let i = 0; i < T; i++) {
  const [M, N, x, y] = input[i].split(' ').map(Number);
  const destruction = lcm(M, N); // 멸망의 해
  let year = 0;

  // x를 먼저 맞추고, y를 맞춤
  // y는 M만큼 증가하고 N으로 나머지 연산을 한다면, y의 값을 알 수 있음
  // y를 M만큼 계속 증가시키다보면 y를 찾을 수 있음r
  for (let k = x; k <= destruction; k += M) {
    // 현재 y값이 N과 같다면 N의 나머지와 비교했을 때 0 != N이 되어 값을 찾지 못하게 된다.
    // 따라서 x에 M을 계속 더한 값이 N으로 나누어 떨어진다면 현재 y값을 N값으로 설정한다.
    const ty = k % N === 0 ? N : k % N;
    if (ty === y) {
      year = k;
      break;
    }
  }

  console.log(year ? year : -1);
}

/**
 * 최대공약수 - 유클리드호제법 활용 O(log N)
 * A, B의 최대공약수는 B, C의 최대공약수와 같다는 원리 (A % B = C)
 * 예) A = 10, B = 12
 *    10 % 12 = 10
 *    12 % 10 = 2
 *    10 % 2 = 0
 */
function gcd(a, b) {
  let x = Math.max(a, b);
  let y = Math.min(a, b);
  let remainder;
  while (y) {
    remainder = x % y;
    x = y;
    y = remainder;
  }
  return x;
}

// 최소공배수 = (M x N) / 최대공약수
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}
