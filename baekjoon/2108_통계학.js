const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const nums = input.map(Number).sort((a, b) => a - b);
let answer = '';

// 산술평균
answer += Math.round(nums.reduce((acc, cur) => acc + cur, 0) / n) + '\n';

// 중앙값
answer += nums[Math.floor(n / 2)] + '\n';

// 최빈값
const map = new Map();
const modes = [];
let maxCount = 1;
for (let i = 0; i < n; i++) {
  const number = nums[i];
  if (map.has(number)) {
    maxCount = Math.max(maxCount, map.get(number) + 1);
    map.set(number, map.get(number) + 1);
  } else {
    map.set(number, 1);
  }
}
for (const [key, value] of map) {
  if (value === maxCount) modes.push(key);
}
answer += (modes.length === 1 ? modes[0] : modes[1]) + '\n';

// 범위
answer += nums[n - 1] - nums[0] + '\n';
console.log(answer);
