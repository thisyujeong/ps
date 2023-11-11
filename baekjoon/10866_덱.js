const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const dequeue = [];
const answer = [];

for (let i = 0; i < n; i++) {
  let [order, x] = input[i].split(' ');
  let isNull = dequeue.length === 0;

  switch (order) {
    case 'push_front':
      x = parseInt(x);
      dequeue.unshift(x);
      break;
    case 'push_back':
      x = parseInt(x);
      dequeue.push(x);
      break;
    case 'pop_front':
      answer.push(isNull ? -1 : dequeue.shift());
      break;
    case 'pop_back':
      answer.push(isNull ? -1 : dequeue.pop());
      break;
    case 'size':
      answer.push(dequeue.length);
      break;
    case 'empty':
      answer.push(isNull ? 1 : 0);
      break;
    case 'front':
      answer.push(isNull ? -1 : dequeue[0]);
      break;
    case 'back':
      answer.push(isNull ? -1 : dequeue[dequeue.length - 1]);
      break;
  }
}

console.log(answer.join('\n'));
