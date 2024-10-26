//에라토스테네스의 체
const input = require('fs').readFileSync('./input.txt').toString().trim().split(' ');
const [M, N] = input.map((v) => +v);
let isPrimes = Array(N + 1).fill(true);
isPrimes[0] = false;
isPrimes[1] = false;

// 풀이
for (let i = 2; i <= Math.sqrt(N); i++) {
  if (isPrimes[i]) {
    let times = 2;
    while (i * times <= N) {
      isPrimes[i * times] = false;
      times++;
    }
  }
}

// 다른 풀이 분석
for (let i = 2; i <= Math.sqrt(N); i++) {
  if (isPrimes[i]) {
    // 반복문의 조건을 다음과 같이 지정하면
    // 각 수의 배수를 별도의 변수를 생성하지 않고도 쉽게 탐색할 수 있음
    for (let j = i * i; j <= N; j += i) {
      isPrimes[j] = false;
    }
  }
}

const result = [];
for (let i = M; i <= N; i++) {
  if (isPrimes[i]) result.push(i);
}
console.log(result.join('\n'));
