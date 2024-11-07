/* 그래프 문제 bfs */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number); // N:유저의 수, M:친구 관계의 수
const nums = input.map((pair) => pair.split(' ').map(Number));

const relation = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < M; i++) {
  const [from, to] = nums[i];
  relation[from].push(to);
  relation[to].push(from);
}

function bfs(start) {
  let visited = Array.from({ length: N + 1 }).fill(0); // 방문기록
  let step = Array.from({ length: N + 1 }).fill(0); // start 지점에서 i번째로 가는 단계
  let queue = [start];
  visited[start] = -1;

  while (queue.length) {
    const cur = queue.shift();
    for (let next of relation[cur]) {
      if (!visited[next]) {
        queue.push(next); // 다음 지점 방문예약
        visited[next] = 1; // 다음 지점 방문처리
        step[next] = step[cur] + 1; // 다음지점 단계 = 현재 지점에서 + 1단계
      }
    }
  }

  return step.reduce((acc, cur) => acc + cur, 0);
}

const answer = [];
for (let i = 1; i <= N; i++) {
  answer.push([i, bfs(i)]); // [인덱스, 케빈 베이컨의 수]
}

// 오름차순 정렬, 케빈 베이컨의 수가 같다면 인덱스를 기준으로 오름차순
answer.sort((a, b) => {
  if (a[1] === b[1]) a[0] - b[0];
  return a[1] - b[1];
});
console.log(answer[0][0]);
