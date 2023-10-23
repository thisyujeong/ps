const N = parseInt(require('fs').readFileSync('./input.txt').toString().trim());

function print(k) {
  let str = '';
  for (let i = 0; i < N - k; i++) {
    str += ' ';
  }
  for (let i = k * 2 - 1; i > 0; i--) {
    str += '*';
  }
  return str;
}

let result = '';
for (let i = N; i > 0; i--) {
  result += print(i) + '\n';
}
for (let i = 2; i <= N; i++) {
  result += print(i) + '\n';
}
console.log(result);
