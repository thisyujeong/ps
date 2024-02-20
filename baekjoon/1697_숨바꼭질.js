/**
 * 1. x + 1 인 경우
 * 2. x - 1 인 경우
 * 3. x * 2 인 경우
 *
 * [✓] 위치의 범위 0 <= n <= 100,000 -> 해당 범위를 초가할 경우 탐색하지 않음
 * [✓] 이미 방문한 위치는 중복 되지 않도록 방문 처리 -> bfs 알고리즘 방식 사용 가능
 */
const fs = require('fs');
const [n, k] = fs.readFileSync('./input.txt').toString().trim().split(' ').map(Number); // 수빈 점 n, 동생 점 k
const visited = Array.from({ length: 100100 }, () => 0);

function bfs(n) {
  const queue = [[n, 0]]; // [current num, count]
  visited[n] = 1;

  while (queue.length) {
    const [cur, cnt] = queue.shift();
    if (cur === k) return cnt;

    for (next of [cur - 1, cur + 1, cur * 2]) {
      if (!visited[next] && next >= 0 && next <= 100000) {
        visited[next] = 1;
        queue.push([next, cnt + 1]);
      }
    }
  }
}

console.log(bfs(n));
