const N = +require('fs').readFileSync('./input.txt').toString().trim(); // 0 <= N <= 10,000
let count = 0;
let series = 666;

while (count < N) {
  if (String(series).includes(666)) count++;
  series++;
}

console.log(series - 1);
