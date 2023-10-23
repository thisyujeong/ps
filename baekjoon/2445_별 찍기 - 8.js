const N = parseInt(require('fs').readFileSync('./input.txt').toString().trim());

function print(k) {
  let str = '';
  for (let i = 0; i <= k; i++) {
    str += '*';
  }
  for (var i = 0; i < 2 * (N - k - 1); i++) {
    str += ' ';
  }
  for (let i = 0; i <= k; i++) {
    str += '*';
  }
  return str;
}

for (let i = 0; i < N; i++) {
  console.log(print(i));
}

for (let i = N - 2; i >= 0; i--) {
  console.log(print(i));
}
