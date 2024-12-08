const input = require('fs').readFileSync('./input.txt').toString().trim().split(' ');
const [N, K] = input.map(Number); // 0 ≤ N ≤ 100,000, 0 ≤ K ≤ 100,000

function bfs(start, end) {
  const max = 100000;
  const visited = Array.from({ length: max + 1 }).fill(0); // 방문하는데 걸리는 시간
  const count = Array.from({ length: max + 1 }).fill(0); // 방문 루트 수

  // 시작점, 도착점이 같다면, 방문하는데 0초, 방문 루트 1개
  if (start === end) return [0, 1];

  const queue = [start];
  count[start] = 1; // 시작 지점 도달 루트 1개

  while (queue.length) {
    const cur = queue.shift();
    for (let next of [cur - 1, cur + 1, cur * 2]) {
      if (next >= 0 && next <= max) {
        if (!visited[next]) {
          queue.push(next); // 다음 지점 방문 예약
          visited[next] = visited[cur] + 1; // next까지 도달한 시간
          count[next] += count[cur]; // next까지 도달한 루트 개수
        }
        // next를 이미 방문한 적 있고, next의 최초 도착 시간과 같다면
        else if (visited[next] === visited[cur] + 1) {
          count[next] += count[cur]; // 도달한 루트 추가
        }
      }
    }
  }

  return [visited[end], count[end]];
}

const answer = bfs(N, K);
console.log(answer.join('\n'));
