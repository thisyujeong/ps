const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const [N, M, V] = input.shift().split(' ').map(Number); // M 정점, M 간선, V 탐색 번호
const answer_dfs = [];
const answer_bfs = [];

// 그래프 생성
let graph = Array.from(new Array(N + 1)).map(() => []);
input.forEach((vertex, id) => {
  const [from, to] = vertex.split(' ').map(Number);
  graph[from].push(to);
  graph[to].push(from);
});

graph.map((v) => v.sort((a, b) => a - b)); // 그래프 오름차순 정렬

// DFS 깊이우선탐색 - 재귀함수 활용
function DFS(graph, v, visited) {
  if (visited[v]) return;
  visited[v] = true;
  answer_dfs.push(v);
  for (let i = 0; i < graph[v].length; i++) {
    let next = graph[v][i];
    if (!visited[v][i]) DFS(graph, next, visited);
  }
}

// BFS 너비우선탐색 - queue 또는 linked list 활용
function BFS(graph, v, visited) {
  const queue = [v]; // 시작노드를 큐에 삽입

  // queue의 길이가 0이 될때까지 반복
  while (queue.length) {
    let x = queue.shift(); // queue에서 첫번째 노드 꺼냄

    // 해당 노드를 방문한 적이 없을 경우
    if (!visited[x]) {
      visited[x] = true; // 해당 노드 방문 처리
      answer_bfs.push(x);

      // 꺼낸 노드와 인접한 노드들 길이 만큼 반복
      for (let i = 0; i < graph[x].length; i++) {
        let next = graph[x][i]; // 다음 방문할 노드 (꺼낸 노드와 인접한 노드)

        // 다음 노드를 방문한적 없을 경우
        if (!visited[next]) {
          queue.push(next); // 해당 노드를 방문할 노드 목록인 queue에 삽입
        }
      }
    }
  }
}

let visited = new Array(N + 1).fill(false);
DFS(graph, V, visited);
console.log(answer_dfs.join(' '));

visited = new Array(N + 1).fill(false);
BFS(graph, V, visited);
console.log(answer_bfs.join(' '));
