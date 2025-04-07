/* 다익스트라 가중치 그래프, DP */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, d] = input.shift().split(' ').map(Number);
const shortcuts = input.map((line) => line.split(' ').map(Number));
const graph = Array.from(Array(d + 1), () => []);
const dist = Array.from(Array(d + 1).fill(Infinity));

dist[0] = 0;

shortcuts.forEach(([start, end, dist]) => {
  if (end > d) return; // 지름길 도착점이 고속도로 끝점을 지나는 경우
  if (end - start <= dist) return; // 지름길이 더 느린 경우
  graph[start].push([end, dist]);
});

for (let i = 0; i <= d; i++) {
  if (i > 0) {
    dist[i] = Math.min(dist[i], dist[i - 1] + 1);
  }

  for (let [next, cost] of graph[i]) {
    if (dist[next] > dist[i] + cost) {
      dist[next] = dist[i] + cost;
    }
  }
}

console.log(dist[d]);
