/* 팩토리얼 - 재귀함수 활용 */
const n = +require('fs').readFileSync('./input.txt').toString().trim();

function factorial(num) {
  if (num < 2) return 1;
  return num * factorial(num - 1);
}

console.log(factorial(n));
