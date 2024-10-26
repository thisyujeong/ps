const input = require('fs').readFileSync('./input.txt').toString().split('\n');
const n = +input.shift();
const queue = [];
const answer = [];

function prompt(cmd, x) {
  switch (cmd) {
    case 'push': // 정수 X를 큐에 넣는 연산이다.
      queue.push(+x);
      break;
    case 'pop': // 큐에서 가장 앞에 있는 정수를 빼고, 그 수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
      answer.push(queue.shift() || -1);
      break;
    case 'size': // 큐에 들어있는 정수의 개수를 출력한다.
      answer.push(queue.length);
      break;
    case 'empty': // 큐가 비어있으면 1, 아니면 0을 출력한다.
      answer.push(!!queue.length ? 0 : 1);
      break;
    case 'front': // 큐의 가장 앞에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
      answer.push(queue[0] || -1);
      break;
    case 'back': // 큐의 가장 뒤에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
      answer.push(queue.at(-1) || -1);
      break;
  }
}

for (let i = 0; i < n; i++) {
  const [cmd, x] = input[i].split(' ');
  prompt(cmd, +x);
}
console.log(answer.join('\n'));
