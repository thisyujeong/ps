/* 해시맵 문제 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number); // N:저장된 사이트 주소의 수, M:찾으려는 사이트 주소의 수
const notepad = new Map();

for (let i = 0; i < N; i++) {
  const [site, password] = input[i].split(' ');
  notepad.set(site, password);
}

let result = '';
for (let k = N; k < N + M; k++) {
  result += notepad.get(input[k]) + '\n';
}
console.log(result);
