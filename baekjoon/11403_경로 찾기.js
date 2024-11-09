const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input.shift();
const matrix = input.map((row) => row.split(' ').map(Number));

/**
 * 풀이 1 - 플로이드 와샬(Floyd warshall)
 * Floyd-Warshall 알고리즘: 모든 정점에서 모든 정점 탐색
 * (https://blog.naver.com/ndb796/221234427842)
 * - 다익스트라 알고리즘: 하나의 점점에서 출발했을 때 모든 정점으로의 최단 경로를 구하는 알고리즘
 * - 플로이드 와샬 알고리즘: '모든 정점'에서 '모든 저점'으로 최단 경로를 구하는 알고리즘
 * 다익스트라 알고리즘은 가장 적은 비용을 하나씩 선택해야 했다면,
 * 플로이드 와샬 알고리즘은 기본적으로 '거쳐가는 정점'을 기준으로 알고리즘을 수행한다는 점이 특징
 */

function floydWarshall(N, matrix) {
  // k: i to j 경로의 중간 정점
  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        // matrix[i][k]와 matrix[k][j]의 값이 양수라면 도달가능한 정점
        if (matrix[i][k] && matrix[k][j]) {
          matrix[i][j] = 1;
        }
      }
    }
  }
}
floydWarshall(N, matrix);
console.log(matrix.map((row) => row.join(' ')).join('\n'));

/* 풀이 2 - BFS */
const graph = Array.from({ length: N }, () => []);
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (matrix[i][j]) {
      graph[i].push(j);
    }
  }
}

function bfs(i, j) {
  const queue = [i];
  const visited = new Array(N).fill(0);
  let path = 0; // 경로 길이

  while (queue.length) {
    const v = queue.shift();
    // 경로 길이가 양수이고 목적지 정점을 찾았다면
    if (v === j && path > 0) return 1;
    for (let next of graph[v]) {
      if (!visited[next]) {
        queue.push(next);
        visited[next] = 1;
        path++;
      }
    }
  }

  return 0;
}

let answer = '';
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    answer += bfs(i, j) + ' ';
  }
  answer += '\n';
}
console.log(answer);
