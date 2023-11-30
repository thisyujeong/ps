const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
input.shift();

for (let i = 0; i < input.length; i += 2) {
  const n = +input[i];
  const graph = [0].concat(input[i + 1].split(' ').map(Number)); // 순열
  const visited = new Array(n + 1).fill(false); // 방문 여부
  let count = 0;

  for (let j = 1; j <= n; j++) {
    if (!visited[j]) {
      dfs(j);
      count++;
    }
  }

  console.log(count);

  function dfs(v) {
    visited[v] = true;
    let next = graph[v];
    if (!visited[next]) dfs(next);
  }
}
