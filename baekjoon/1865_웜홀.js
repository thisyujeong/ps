/**
 * 벨만-포드 알고리즘
 * 한 노드에서 다른 노드까지의 최단 거리를 구하는 알고리즘으로, 간선의 가중치가 음수일 때도 최단거리를 구할 수 있다.
 * https://www.youtube.com/watch?v=Ppimbaxm8d8
 * https://www.youtube.com/watch?v=PIT-aYPPPIQ
 *
 * 벨만-포드와 다익스트라 알고리즘의 차이점 ??
 * 1, 2, 3번 노드가 있고, 1번에서 3번 노드로 가는 최단 거리를 구한다고 할때
 * - from: 1, to: 3, cost: 10
 * - from: 1, to: 2, cost: 20
 * - from: 2, to: 3, cost: -15
 *
 * 1번에서 3번노드로 가는 경로는 두가지가 있고, 최단 거리는 두번째 방법이라는 것을 알 수 있다.
 * - 첫번째 방법. 1 > 3 (cost: 10)
 * - 두번째 방법. 1 > 2 > 3 (cost: 5)
 *
 * 그러나, 다익스트라 알고리즘을 사용하게되면, 매번 방문하지 않은 노드 중 최단 거리가 가장 짧은 노드를 선택하므로
 * `1 > 3 (cost: 10)` 경로를 선택하게된다. 이처럼 음수 간선이 존재하면 최단 거리를 찾을 수 없는 상황이 발생한다
 *
 * 반면 벨만-포드 알고리즘은 매번 모든 간선을 전부 확인하므로,
 * 1 > 2 > 3 (cost: 20 - 15 = 5)의 경로를 선택하여 최단 거리를 찾을 수 있게 된다
 *
 * 1. 다익스트라
 * - 매번 방문하지 않은 노드에서 최단 거리가 가장 짧은 노드를 선택하여 한 단계씩 최단 거리를 구해나간다.
 * - 음수 간선이 없다면 최적의 해를 찾을 수 있다.
 * - 시간 복잡도가 빠르다 O(ElogV) -> 개선된 다익스트라 알고리즘(우선순위 큐)
 *
 * 2. 벨만-포드
 * - [정점 - 1]번의 매 단계마다 모든 간선을 전부 확인하면서 모든 노드 간의 최단거리를 구해나간다
 *   <-> 다익스트라와의 차이점은  매 반복마다 모든 간선을 확인한다는 것.  다익스트라는 방문하지 않은 노드 중 최단 거리가 가장 가까운 노드만을 방문
 * - 음수 간선이 있어도 최적의 해를 찾을 수 있다.
 * - 시간 복잡도가 느리다 O(VE) = O(정점개수 x 간선 개수)
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const T = +input.shift();

function bellman_ford(edge, n) {
  // 시작노드가 모든 점이 될 수 있기 때문에 Infinity가 아닌 0으로 초기화
  const distances = Array(n + 1).fill(0);

  // 모든 간선을 전부 확인
  for (let i = 1; i <= n; i++) {
    for (const { start, end, time } of edge) {
      if (distances[start] + time < distances[end]) {
        distances[end] = distances[start] + time;
      }
    }
  }

  return distances;
}

// 테스트 케이스
for (let i = 0; i < T; i++) {
  // N:지점의 수, M:도로의 개수, W:웜홀의 개수 (1 ≤ N ≤ 500, 1 ≤ M ≤ 2500, 1 ≤ W ≤ 200)
  const [N, M, W] = input.shift().split(' ').map(Number);
  const road = input.splice(0, M).map((line) => line.split(' ').map(Number)); // S와 E는 연결된 지점의 번호, T는 걸리는시간
  const wormhole = input.splice(0, W).map((line) => line.split(' ').map(Number)); // [S:시작지점, E:도착지점, T:줄어드는 시간]
  const edge = [];

  // 도로는 양방향 그래프 (양의 간선)
  for (let [start, end, time] of road) {
    edge.push({ start, end, time });
    edge.push({ start: end, end: start, time });
  }
  // 웜홀은 단방향 그래프 (음의 간선)
  for (let [start, end, time] of wormhole) {
    edge.push({ start, end, time: time * -1 });
  }

  console.log('road', road);
  console.log('wormhole', wormhole);

  // bellman-ford
  const distances = bellman_ford(edge, N);

  console.log(distances);
  let pass = 'NO';
  for (let i = 1; i <= N; i++) {
    for (let { start, end, time } of edge) {
      if (distances[start] + time < distances[end]) {
        pass = 'YES';
        break;
      }
    }
  }

  console.log(pass);
}
