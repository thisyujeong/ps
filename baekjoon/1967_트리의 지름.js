/**
 * 1167 트리의 지름 문제와 풀이 방법은 동일
 * 트리의 지름
 * - 임의의 노드에서 가장 긴 경로로 연결된 노드는 트리의 지름에 해당하는 두 노드 중 하나다.
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift(); // 노드 수
const tree = Array.from({ length: n + 1 }, () => []); // 인접 트리

// 인접 트리 구성
input.forEach((line) => {
  const [parent, child, weight] = line.split(' ').map(Number);
  tree[parent].push([child, weight]);
  tree[child].push([parent, weight]);
});

function bfs(v) {
  const visited = new Array(n + 1).fill(); // 방문 체크
  const queue = [[v, 0]];
  let max = { node: 0, dist: 0 };

  while (queue.length) {
    const [node, dist] = queue.shift();

    if (visited[node]) continue;
    if (max.dist < dist) max = { node, dist };

    visited[node] = 1;

    for (let i = 0; i < tree[node].length; i++) {
      const [nextNode, nextDist] = tree[node][i];
      queue.push([nextNode, nextDist + dist]);
    }
  }

  return max;
}

console.log(bfs(bfs(1).node).dist);
