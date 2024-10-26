// -100,000 ≤ xi, yi ≤ 100,000
// O(10^5)
const [n, ...input] = require('fs')
  .readFileSync('./input.txt')
  .toString()
  .trim()
  .split('\n');
const coords = input.map((v) => v.split(' ').map(Number));
let result = '';

// sort  - O(nlogn)
coords.sort((a, b) => {
  if (a[0] === b[0]) return a[1] - b[1];
  return a[0] - b[0];
});

for (let i = 0; i < n; i++) {
  result += coords[i].join(' ') + '\n';
}

console.log(result);
