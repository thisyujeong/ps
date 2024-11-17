const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const arr = input.map((v) => v.split(' ').map(Number));
const tree = Array.from({ length: n + 1 }, () => []);
const visited = Array.from({ length: n + 1 }).fill(0);
const parents = Array.from({ length: n + 1 }).fill(0);

for (let [from, to] of arr) {
  tree[from].push(to);
  tree[to].push(from);
}

function dfs(node) {
  visited[node] = 1;
  for (const next of tree[node]) {
    if (!visited[next]) {
      dfs(next);
      parents[next] = node;
    }
  }
}

function bfs(node) {
  const queue = [node];
  let head = 0;
  visited[node] = 1;

  while (head < queue.length) {
    const cur = queue[head++];
    for (const next of tree[cur]) {
      if (!visited[next]) {
        queue.push(next);
        visited[next] = 1;
        parents[next] = cur;
      }
    }
  }
}

dfs(1);
// bfs(1);

console.log(parents.slice(2).join('\n'));
