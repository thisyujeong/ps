const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();

function gcd(num1, num2) {
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

for (let i = 0; i < n; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  console.log((a * b) / gcd(a, b));
}
