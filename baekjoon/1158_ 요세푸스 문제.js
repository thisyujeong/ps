const fs = require('fs');
const [n, k] = fs.readFileSync('./input.txt').toString().trim().split(' ').map(Number);
let queue = [...new Array(n)].map((_, i) => i + 1);
let answer = [];
let count = 1;

while (queue.length) {
  let num = queue.shift();

  if (count % k === 0) answer.push(num);
  else queue.push(num);

  count++;
}

console.log(`<${answer.join(', ')}>`);
