/**
 * 250329 1day bfs 20m
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');

// 풀이 1 - 그래프 bfs 탐색
const solve1 = (input) => {
  const n = +input.shift();
  const table = input.map((line) => line.split(' ').map(Number));
  const graph = Array.from({ length: n }, () => []);
  let answer = '';

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (table[i][j] === 1) {
        graph[i].push(j);
      }
    }
  }

  const bfs = (from, to) => {
    const visited = new Array(n).fill(0);
    const queue = [from];
    let path = 0;

    while (queue.length) {
      const cur = queue.shift();
      if (path > 0 && cur === to) return 1;
      for (let next of graph[cur]) {
        if (!visited[next]) {
          visited[next] = 1;
          queue.push(next);
          path++;
        }
      }
    }
    return 0;
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      answer += bfs(i, j) + ' ';
    }
    answer += '\n';
  }

  console.log(answer);
};

// solve1(input);

// 풀이 2 (플로이드 와샬)
// - 다익스트라: '하나의 정점'에서 '모든 정점'으로의 최단 경로
// - 플로이드 와샬: '모든 정점'에서 '모든 정점'으로의 최단 경로
// 기본적으로 '거쳐가는 정점'을 기준으로 알고리즘을 수행한다는 점이 특징
const solve2 = (input) => {
  const n = +input.shift();
  const table = input.map((line) => line.split(' ').map(Number));
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (table[i][k] && table[k][j]) {
          table[i][j] = 1;
        }
      }
    }
  }

  console.log(table.map((row) => row.join(' ')).join('\n'));
};

solve2(input);
