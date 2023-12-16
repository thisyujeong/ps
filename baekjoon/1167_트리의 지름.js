/**
 * 트리의 지름 개념 참고
 * https://www.youtube.com/watch?v=gIROKVJV6w8&t=1251s
 * - 임의의 노드에서 가장 긴 경로로 연결된 노드는 트리의 지름에 해당하는 두 노드 중 하나다.
 *
 * 이 문제에서는 트리의 지름 개념과 위의 아이디어를 이해하는 것이 가장 중요하다.
 * 위 개념을 이해하면 dfs, bfs로 문제를 푸는 것은 쉬움
 */

const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const tree = Array.from({ length: n + 1 }, () => []);
let visited = new Array(n + 1).fill(0);
let max = { node: 0, dist: 0 };

// 인접 트리 구성
input.forEach((line) => {
  const [node, ...nodeInfo] = line.split(' ').map(Number);
  for (let i = 0; i < nodeInfo.length - 1; i += 2) {
    tree[node].push([nodeInfo[i], nodeInfo[i + 1]]);
  }
});

// 임의의 노드에서 가장 긴 경로의 찾기
dfs(1, 0);

// dist, visited 초기화
max.dist = 0;
visited = new Array(n + 1).fill(0);

// 트리의 지름을 구성하는 다른 노드를 찾기 위해
// 임의의 노드로부터 찾은 가장 긴 경로의 노드에서 dfs를 한번 더 수행
dfs(max.node, 0);
console.log(max.dist);

// dfs
function dfs(node, dist) {
  visited[node] = 1; // 현재 노드 방문처리
  if (max.dist < dist) max = { node, dist }; // 현재 노드와 다음 노드의 거리가 가장 긴 노드 정보 저장

  // 현재 노드와 인접한 노드의 개수만큼 실행
  for (let i = 0; i < tree[node].length; i++) {
    const [nextNode, nextDist] = tree[node][i]; // 다음 노드와 거리
    if (visited[nextNode]) continue; // 이미 방문한 노드일 건너뜀
    dfs(nextNode, dist + nextDist); // 다음 dfs에 거리 값을 더해줌
  }
}
