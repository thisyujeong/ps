const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const queue = [];
const answer = [];

for (let i = 0; i < n; i++) {
  let [order, x] = input[i].split(' ');
  let isNull = queue.length === 0;

  switch (order) {
    case 'push':
      queue.push(parseInt(x));
      break;
    case 'pop':
      answer.push(isNull ? -1 : queue.shift());
      break;
    case 'size':
      answer.push(queue.length);
      break;
    case 'empty':
      answer.push(isNull ? 1 : 0);
      break;
    case 'front':
      answer.push(isNull ? -1 : queue[0]);
      break;
    case 'back':
      answer.push(isNull ? -1 : queue[queue.length - 1]);
      break;
  }
}

console.log(answer.join('\n'));
