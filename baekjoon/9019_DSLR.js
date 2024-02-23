/**
 * bfs 반복문 내에서 여러번 메모리를 사용하는 것보다,
 * control 객체처럼 함수 외부에 저장하여 지속적인 메모리 낭비를 막는 방법을 사용했다.
 * 그러나,, 이 방법은 시간이 더 많이 걸리는 것 같다.
 */
const fs = require('fs');
const [t, ...input] = fs.readFileSync('./input.txt').toString().trim().split('\n');
const answer = [];

// 명령어를 배열로 저장
const command = ['D', 'S', 'L', 'R'];
// 각 명령어에 대한 연산식을 객체로 생성
const control = {
  D: (n) => (n * 2) % 10000,
  S: (n) => (n === 0 ? 9999 : n - 1),
  L: (n) => (n % 1000) * 10 + Math.floor(n / 1000),
  R: (n) => (n % 10) * 1000 + Math.floor(n / 10),
};

// 너비우선탐색
function bfs(from, to) {
  const visited = new Array(10000).fill(0);
  const queue = [[from, '']];
  visited[from] = 1;

  while (queue.length) {
    const [cur, cmd] = queue.shift();
    if (cur === to) {
      answer.push(cmd);
      return;
    }

    // D, S, L, R 명령어 수(4)만큼 반복문 수행
    for (let i = 0; i < command.length; i++) {
      const nextCmd = command[i]; // D, S, L, R명령어
      const next = control[nextCmd](cur); // 현재 명령어의 연산결과

      // 이미 탐색했던 수인지 체크, 미탐색 상태라면 다음 코드블럭 수행
      if (!visited[next]) {
        visited[next] = 1; // 탐색 처리
        queue.push([next, cmd + nextCmd]);
      }
    }
  }
}

input.forEach((tc) => {
  const [from, to] = tc.split(' ').map(Number);
  bfs(from, to);
});

console.log(answer.join('\n'));
