const N = +require('fs').readFileSync('./input.txt').toString().trim();

function print(k) {
  let str = '';
  for (let j = N - k - 1; j > 0; j--) {
    str += ' ';
  }
  for (let j = 0; j <= k; j++) {
    str += '*';
  }
  return str;
}

let result = '';
for (let i = 0; i < N; i++) {
  result += print(i) + '\n';
}
for (let i = N - 2; i >= 0; i--) {
  result += print(i) + '\n';
}

console.log(result);
