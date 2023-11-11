/**
 * push_front X: 정수 X를 덱의 앞에 넣는다.
 * push_back X: 정수 X를 덱의 뒤에 넣는다.
 * pop_front: 덱의 가장 앞에 있는 수를 빼고, 그 수를 출력한다. 만약, 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
 * pop_back: 덱의 가장 뒤에 있는 수를 빼고, 그 수를 출력한다. 만약, 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
 * size: 덱에 들어있는 정수의 개수를 출력한다.
 * empty: 덱이 비어있으면 1을, 아니면 0을 출력한다.
 * front: 덱의 가장 앞에 있는 정수를 출력한다. 만약 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
 * back: 덱의 가장 뒤에 있는 정수를 출력한다. 만약 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
 */

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
