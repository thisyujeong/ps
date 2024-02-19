const N = +require('fs').readFileSync('./input.txt').toString().trim();
let result = '';

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    star(x, y, N);
  }
  result += '\n';
}

console.log(result);

function star(x, y, n) {
  if (x % 3 === 1 && y % 3 == 1) {
    result += ' ';
  } else {
    if (n === 1) result += '*';
    else star(Math.floor(x / 3), Math.floor(y / 3), Math.floor);
  }
}
