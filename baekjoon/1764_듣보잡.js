const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number); // N:듣도 못한 사람 수, M:보도 못한 사람 수
const people = new Map();
let result = [];

for (let j = 0; j < N + M; j++) {
  if (j < N) people.set(input[j], 1); // 듣도 못한 사람
  else if (people.has(input[j])) result.push(input[j]); // 해시맵에 이미 있다면 듣도 보도 못한 사람
}

result.sort(); // 사전 순 정렬
console.log(result.length);
console.log(result.join('\n'));
