/**
 * DFS, BFS
 * 트리는 사이클이 없다.
 * 트리의 지름: 임의의 노드에서 가장 긴 경로로 연결된 노드는 트리의 지름에 해당하는 두 노드 중 하나다.
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift(); // n(1 ≤ n ≤ 10,000)
const tree = Array.from({ length: n + 1 }, () => []);

input.map((v) => {
  const [p, c, w] = v.split(' ').map(Number); // 부모노드, 자식노드, 가중치
  tree[p].push([c, w]);
  tree[c].push([p, w]);
});

function bfs(v) {
  const visited = Array.from({ length: n + 1 }).fill(0);
  const queue = [[v, 0]];
  let head = 0;
  let max = { node: 0, weight: 0 };
  visited[v] = 1;

  while (queue.length > head) {
    const [node, weight] = queue[head++];
    if (max.weight < weight) max = { node, weight };
    for (let [next, next_weight] of tree[node]) {
      if (!visited[next]) {
        visited[next] = 1;
        queue.push([next, weight + next_weight]);
      }
    }
  }
  return max;
}

const max = bfs(1);
console.log(bfs(max.node, max.weight).weight);
