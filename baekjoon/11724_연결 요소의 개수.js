const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const graph = Array.from(new Array(N + 1)).map(() => []);
const visited = new Array(N + 1).fill(0);
let count = 0;

// 그래프 생성
input.forEach((v) => {
  let [from, to] = v.split(' ').map(Number);
  graph[from].push(to);
  graph[to].push(from);
});

// dfs
function DFS(v) {
  visited[v] = 1;
  for (let i = 0; i < graph[v].length; i++) {
    let next = graph[v][i];
    if (!visited[next]) DFS(next);
  }
}

// bfs
function BFS(v) {
  queue = [v];
  while (queue.length) {
    const x = queue.shift();
    if (!visited[x]) {
      visited[x] = 1;
      for (let i = 0; i < graph[x].length; i++) {
        let next = graph[x][i];
        if (!visited[next]) {
          queue.push(next);
        }
      }
    }
  }
}

for (let i = 1; i < N + 1; i++) {
  if (!visited[i]) {
    DFS(i); // soultion 1
    // BFS(i); // solution 2
    count++;
  }
}

console.log(count);
