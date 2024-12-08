/**
 * 플로이드-와샬 알고리즘
 * https://velog.io/@kimdukbae/플로이드-워셜-알고리즘-Floyd-Warshall-Algorithm
 * 다익스트라와 같은 최단경로 그래프 알고리즘인 플로이드-와샬 문제
 * 모든 정점에서의 정점까지의 최단 거리를 구할때 사용되는 알고리즘
 *
 * 점화식: D_ab = Min(D_ab, D_ak + D_kb);
 * k: 지나는 정점
 */
const input = require('fs').readFileSync('./input.txt').toString().split('\n');
const n = +input.shift();
const m = +input.shift();
const bus = input.map((v) => v.split(' ').map(Number)); // 시작 도시, 도착도시adsf, 한 번 타는 비용

const dist = Array.from({ length: n + 1 }, () =>
  Array.from({ length: n + 1 }, () => Infinity)
);

// 중복되는 경로(간선) 있을경우 비용이 더 적은 값 저장
bus.forEach(([from, to, cost]) => (dist[from][to] = Math.min(dist[from][to], cost)));

// k: i to j 경로의 중간 정점(k를 거쳐감)
for (let k = 1; k < n + 1; k++) {
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      if (i === j) continue;
      dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
    }
  }
}

for (let i = 0; i < n + 1; i++) {
  for (let j = 0; j < n + 1; j++) {
    if (dist[i][j] === Infinity) dist[i][j] = 0;
  }
}

dist.slice(1).map((v) => {
  console.log(v.slice(1).join(' '));
});
