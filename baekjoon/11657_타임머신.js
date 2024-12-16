/**
 * 음의 간선이 포함된 가중치 그래프 -> 벨만-포드
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number); // N:도시의 개수, M:버스 노선의 개수

// 그래프 구성
const roads = [];
for (let i = 0; i < M; i++) {
  const [start, end, time] = input[i].split(' ').map(Number);
  roads.push({ start, end, time });
}

const distances = Array.from({ length: N + 1 }, () => Infinity);
distances[1] = 0;

let hasNegativeCycle = false;

// 1부터 N까지 모든 노드에서 모든 간선 정보를 탐색
for (let i = 1; i <= N; i++) {
  for (let { start, end, time } of roads) {
    // 방문한 적이 있어서 거리 배열이 무한이 아니고,
    // 최단 거리가 갱신되는 경우 최단거리를 수정
    if (distances[start] !== Infinity && distances[start] + time < distances[end]) {
      distances[end] = distances[start] + time;

      // N + 1번째 실행되면 음수 사이클이 존재한다는 의미로 트리거 값 변경
      if (i === N) hasNegativeCycle = true;
    }
  }
}

if (hasNegativeCycle) {
  console.log(-1);
  return;
}

for (let i = 2; i <= N; i++) {
  console.log(distances[i] === Infinity ? -1 : distances[i]);
}
