/* 이분탐색 문제 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [k, n] = input.shift().split(' ').map(Number);
const lines = input.map((v) => +v);

let max = Math.max(...lines);
let min = 1;

function solution() {
  while (min <= max) {
    let mid = Math.floor((max + min) / 2);
    // let count = 0;
    // const count = lines
    //   .map((line) => Math.floor(line / mid))
    //   .reduce((acc, cur) => acc + cur, 0);

    for (let i = 0; i < k; i++) {
      count += Math.floor(lines[i] / mid);
    }
    if (count < n) max = mid - 1;
    else min = mid + 1;
  }
}

solution();
console.log(max);
