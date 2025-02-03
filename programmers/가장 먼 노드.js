// 풀이 시간: 15분
function solution(n, edge) {
  const graph = Array.from({ length: n + 1 }, () => []);
  const visited = Array.from({ length: n + 1 }).fill(-1);

  // 그래프 구성
  for (const [a, b] of edge) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const bfs = (v) => {
    const queue = [v]; // 노드, 간선 개수
    let head = 0;

    visited[v] = 1;

    while (head < queue.length) {
      const cur = queue[head++];

      for (const next of graph[cur]) {
        if (visited[next] < 0) {
          queue.push(next);
          visited[next] = visited[cur] + 1;
        }
      }
    }

    return Math.max(...visited);
  };

  const farDistance = bfs(1);
  return visited.filter((dist) => dist === farDistance).length;
}
