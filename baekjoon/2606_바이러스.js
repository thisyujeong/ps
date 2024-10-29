/* 그래프 문제 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const k = +input.shift(); // 컴퓨터 수 (k <= 100)
const n = +input.shift(); // 인접한 컴퓨터 쌍의 수

// 그래프 구성
const graph = Array.from({ length: k + 1 }, () => []);
for (let i = 0; i < n; i++) {
  const [from, to] = input[i].split(' ').map(Number);
  graph[from].push(to);
  graph[to].push(from);
}

/* bfs - queue */
function bfs(start) {
  const visited = new Array(k + 1).fill(0);
  const queue = [start];
  let count = 0;
  visited[1] = 1;
  while (queue.length) {
    const v = queue.shift();
    for (let next of graph[v]) {
      if (!visited[next]) {
        visited[next] = 1;
        queue.push(next);
        count++;
      }
    }
  }
  console.log(count);
}
bfs(1);

/* dfs - 재귀함수 */
const visited = new Array(k + 1).fill(0);
let count = 0;
visited[1] = 1;
function dfs(start) {
  for (let next of graph[start]) {
    if (!visited[next]) {
      visited[next] = 1;
      dfs(next);
      count++;
    }
  }
}
dfs(1);
console.log(count);
