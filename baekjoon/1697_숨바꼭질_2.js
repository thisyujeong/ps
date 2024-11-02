/* BFS 문제 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split(' ');
const [N, K] = input.map((v) => +v);
const MIN_RANGE = 0;
const MAX_RANGE = 100001;

function solution(n, k) {
  if (n === k) return 0; // base
  const target = k;
  const visited = Array.from({ length: MAX_RANGE }, () => 0);
  const queue = [[n]];
  let time = 0;

  visited[n] = true; // 시작점 방문 처리

  while (queue.length) {
    const currCoord = queue.shift(); // 현재 좌표들
    const nextCoord = []; // 다음에 방문할 좌표들

    // 현재 좌표들 순회
    for (let cx of currCoord) {
      // 다음 좌표들 (x-1, x+1, x*2) 순회
      for (let next of [cx + 1, cx - 1, cx * 2]) {
        if (next < MIN_RANGE || next > MAX_RANGE) continue; // 범위를 벗어날 경우 패스
        if (visited[next]) continue; // 이미 방문한 좌표라면 패스
        if (next === target) return time + 1; // 다음 좌표가 목표 좌표라면 현재 시간 + 1 반환 및 bfs 종료

        nextCoord.push(next); // 다음에 방문할 좌표 리스트 추가
        visited[next] = 1; // 다음 좌표 방문 처리
      }
    }

    time++;
    queue.push(nextCoord); // 다음에 방문할 좌표 queue에 추가
  }
}

console.log(solution(N, K));
