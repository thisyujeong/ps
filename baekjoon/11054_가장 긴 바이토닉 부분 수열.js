const [N, input] = require('fs').readFileSync('./input.txt').toString().split('\n');
const n = parseInt(N);
const nums = input.split(' ').map(Number);

let up = new Array(n).fill(1);
let down = new Array(n).fill(1);

// LIS 최장 증가 수열
for (let i = 0; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (nums[j] < nums[i]) {
      up[i] = Math.max(up[i], up[j] + 1);
    }
  }
}

// LDS 최장 감소 수열
for (let i = n - 1; i >= 0; i--) {
  for (let k = n - 1; k > i; k--) {
    if (nums[k] < nums[i]) {
      down[i] = Math.max(down[i], down[k] + 1);
    }
  }
}

let max = 0;
for (let i = 0; i < n; i++) {
  let sum = up[i] + down[i] - 1;
  max = max < sum ? sum : max;
}

console.log(max);
