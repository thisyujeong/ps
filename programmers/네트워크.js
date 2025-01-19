// 네트워크의 개수 리턴
// n = 컴퓨터의 개수 (200이하)
// computers.length = 간선의 개수
function solution(n, computers) {
  let answer = 0;
  const graph = Array.from({ length: n }, () => []);
  const visited = Array.from({ length: n }).fill(false);
  const len = computers.length;

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (computers[i][j] === 1) {
        graph[i].push(j);
        graph[j].push(i);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      bfs(i);
      answer++;
    }
  }

  return answer;

  function bfs(start) {
    const queue = [start];
    let head = 0;
    visited[queue] = true;

    while (head < queue.length) {
      const cur = queue[head++];

      for (const next of graph[cur]) {
        if (!visited[next]) {
          queue.push(next);
          visited[next] = true;
        }
      }
    }
  }
}
