/**
 * 나의 풀이
 */
let n = +require('fs').readFileSync('./input.txt').toString().trim();

/* const factors = []; // 소인수분해
let divide = 2; // 주어진 수를 나누기 위한 수

while (n > 0 && divide <= n) {
  // 작은 수부터 차례대로 divide로 나누어보고
  // 나누어 떨어지는 첫번째 경우, divide가 주어진 수의 소인수가 됨.
  if (n % divide === 0) {
    n /= divide; // 주어진 수를 나눈 몫으로 n 값 변경
    factors.push(divide); // 소인수 배열에 push
    divide = 2; // 소인수는 반복되는 숫자가 나올 수 있으니 다시 2로 초기화
  } else {
    divide++; // 나누어 떨어지지 않는다면 나누기 위해 수를 증가
  }
}

console.log(factors.join('\n')); */

/**
 * 다른 풀이
 * for 반복문의 조건식을 살펴보면 i의 제곱이 n을 넘지 않는 범위까지 반복되도록 작성했음
 * 따라서 반복문이 실행되는 횟수를 줄임
 * while 반복문에서 n 이 i로 나누어 떨어질 경우 반복해서 출력하고 주어진 수를 갱신
 */
for (var i = 2; i * i <= n; i++) {
  while (n % i == 0) {
    console.log(i);
    n /= i;
  }
}
// 마지막 소인수를 구함
if (n > 1) {
  console.log(n);
}
return 0;
