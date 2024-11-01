const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, m, v] = input.shift().split(' ').map(Number); // n:정점의 개수, m:간선의 개수, v:시작 정점
const graph = Array.from({ length: n + 1 }, () => []);
let result = [];

for (let i = 0; i < m; i++) {
  const [from, to] = input[i].split(' ').map(Number);
  graph[from].push(to);
  graph[to].push(from);
}

// 그래프 오름차순 정렬
graph.map((v) => v.sort((a, b) => a - b));

/* bfs */
function bfs(v) {
  const visited = Array.from({ length: n + 1 }).fill(0);
  const queue = [v];
  visited[v] = 1;

  while (queue.length) {
    const cur = queue.shift();
    result.push(cur);
    for (let next of graph[cur]) {
      if (!visited[next]) {
        queue.push(next);
        visited[next] = 1;
      }
    }
  }
}

/* dfs */
const visited = Array.from({ length: n + 1 }).fill(0);
visited[v] = 1;

function dfs(v) {
  result.push(v);
  for (let next of graph[v]) {
    if (!visited[next]) {
      visited[next] = 1;
      dfs(next);
    }
  }
}

dfs(v);
console.log(result.join(' '));

result = [];
bfs(v);
console.log(result.join(' '));
