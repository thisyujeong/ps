//// bfs 문제
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const T = +input.shift();
const nums = input.map((v) => v.split(' ').map(Number));
const MAX_SCOPE = 10000;

const command = ['D', 'S', 'L', 'R']; // 명령어 모음
// 계산기
const calc = {
  D: (n) => (n * 2) % 10000,
  S: (n) => (n === 0 ? 9999 : n - 1),
  L: (n) => (n % 1000) * 10 + Math.floor(n / 1000),
  R: (n) => (n % 10) * 1000 + Math.floor(n / 10),
};

function bfs(from, to) {
  // 너비우선탐색
  const visited = new Array(MAX_SCOPE).fill(0);
  const queue = [[from, '']]; // [십진수, 입력된 명령어]
  let head = 0;
  visited[from] = 1;

  while (queue.length) {
    const [cur, cmd] = queue[head++]; // [현재 십진수, 입력된 명령어]
    if (cur === to) return cmd; // 목표 숫자일 경우 중단, 입력 명령어 반환

    // command D, S, L, R 모두 수행
    for (let nextCmd of command) {
      const next = calc[nextCmd](cur); // 다음 십진수
      if (!visited[next]) {
        visited[next] = 1;
        queue.push([next, cmd + nextCmd]);
      }
    }
  }
}

let answer = '';
for (let i = 0; i < T; i++) {
  const [a, b] = nums[i];
  answer += bfs(a, b) + '\n';
}
console.log(answer);
