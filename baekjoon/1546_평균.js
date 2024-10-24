const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input[0];
const arr = input[1].split(' ').map((v) => +v);

/* 풀이 1 */
function getAverage(scores) {
  const max = Math.max(...scores);
  let total = 0;

  for (let i = 0; i < n; i++) {
    let score = (scores[i] / max) * 100;
    total += +score.toFixed(2);
  }

  return total / n;
}

console.log(getAverage(arr));

/**
 * 풀이 2
 * map 함수를 활용하여 간결하게 풀이 가능
 */
let total = 0;
arr.map((i) => (total += (i / Math.max(...arr)) * 100));
console.log(total / n);
