/**
 * 1 <= K <= 100,000(10^5)
 * O(n^2)의 시간복잡도를 갖는 코드를 사용하면 시간초과가 발생할 수 있음.
 * O(nlogn) 이하의 시간복잡도 코드 구현
 */

const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const k = +input.shift();
const nums = input.map((v) => +v);
const stack = [];

// O(n)
for (let i = 0; i < k; i++) {
  if (nums[i] === 0) {
    stack.pop();
    continue;
  }
  stack.push(nums[i]);
}

console.log(stack.reduce((acc, cur) => acc + cur, 0));
