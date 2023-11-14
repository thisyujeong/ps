/**
 * 최대공약수(GCD) - 두 자연수의 공통된 약수 중 가장 큰 수
 * 1. Brute force 무차별 대입, 시간복잡도 O(N)
 *    두 수 중 작은 수를 선택해 다음 1부터 작은 자연수까지의 모든 수로
 *    두 수를 나누면서 동시에 나누어 떨어지는 가장 큰 수를 구하는 방법
 *
 * 2. 유클리드 호제법, 시간복잡도 O(log N)
 *    a, b의 최대공약수는 b, c의 최대공약수와 같다는 원리
 *    즉, 계속해서 a 값에는 b값을, b값에는 c값을 대입하다보면 언젠가는 c이 0이 되는데,
 *    이때 b값에 있는 값이 최대 공약수
 *     a    b    c
 *    -------------
 *    10 % 15 = 10
 *    15 % 10 = 5
 *    10 % 5 = 0
 *
 * 최소공배수(LCM) - 두 자연수의 공통된 배수 중 가장 작은 수
 * 공식) 최소공배수 = 두 자연수의 곱 / 최대공약수
 */
const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split(' ');
const [a, b] = input.map(Number);

// 최대공약수(GCD) - Brute Force
function gcdBruteForce(num1, num2) {
  let min = num1 < num2 ? num1 : num2;
  let result = 0;

  for (let i = min; i > 0; i--) {
    if (a % i == 0 && b % i == 0) {
      result = i;
      break;
    }
  }

  return result;
}

// 최대공약수 (GCD) - 유클리드 호제법
function gcdEclidean(num1, num2) {
  let a = num1;
  let b = num2;
  let c = 0;

  // 재귀함수 활용 가능
  while (a % b !== 0) {
    c = a % b;
    a = b;
    b = c;
  }

  return b;
}

const gcd = gcdEclidean(a, b);
const lcm = (a * b) / gcd; // 최소공배수
console.log(gcd, lcm);
