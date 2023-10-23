const N = +require('fs').readFileSync('./input.txt').toString().trim();
let result = '';

for (let i = 1; i <= N; i++) {
  for (let j = 0; j < N - i; j++) {
    result += ' ';
  }
  for (let j = 0; j < i * 2 - 1; j++) {
    result += j % 2 === 0 ? '*' : ' ';
  }
  result += '\n';
}
console.log(result);
