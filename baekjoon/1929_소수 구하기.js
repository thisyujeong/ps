/* 내 풀이 - 1928 소수찾기 문제와 유사하다고 생각해서 응용하여 풀었다. */
const fs = require('fs');
const [N, M] = fs.readFileSync('./input.txt').toString().trim().split(' ').map(Number);
const primes = [];

function getPrime(num) {
  if (num === 1) return;

  for (let k = 2; k <= Math.sqrt(num); k++) {
    if (num % k === 0) return;
  }

  return true;
}

for (let i = N; i <= M; i++) {
  if (getPrime(i)) primes.push(i);
}

console.log(primes.join('\n'));

/* 다른 사람 풀이 분석 - 배수를 이용하여 약수를 찾아내는 방법 */
let isPrimes = Array(M + 1).fill(true);
isPrimes[0] = isPrimes[1] = false; // 0, 1은 소수가 아님

function solution() {
  // 주어진값 N의 제곱근까지 i의 배수들을 모두 false 처리
  for (let i = 2; i <= Math.sqrt(M); i++) {
    if (isPrimes[i]) {
      let m = 2; // 배수를 구하기 위해 곱해줄수(배수를 찾음으로서 소수가 아님을 알 수 있음)
      while (i * m <= M) {
        isPrimes[i * m] = false; // i의 배수 false 처리
        m++; // i의 2배수, 3배수, 4배수, ...를 검사하기 위해 m을 증가시킴
      }
    }
  }

  const result = [];
  for (let i = N; i <= M; i++) {
    if (isPrimes[i]) result.push(i);
  }

  console.log(result.join('\n'));
}

solution();
