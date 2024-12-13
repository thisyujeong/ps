/**
 * 두가지 풀이가 가능
 * 1. 각 정점간의 거리가 있는 가중치 그래프이므로 다익스트라 알고리즘 풀이 가능
 * 2. '모든 정점'에 대한 문제이므로 플로이드-와샬 알고리즘 풀이 가능
 */

// 1. 다익스트라 알고리즘 풀이 - 우선순위 큐 구현
class PriorityQueue {
  constructor() {
    this.heap = [];
  }
  get size() {
    return this.heap.length;
  }
  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }
  push(value, priority) {
    const node = { value, priority };
    this.heap.push(node);
    this.bubbleUp();
  }
  bubbleUp() {
    let currentIdx = this.heap.length - 1;
    while (currentIdx > 0) {
      let parentIdx = Math.floor((currentIdx - 1) / 2);
      if (this.heap[parentIdx].priority >= this.heap[currentIdx].priority) break;
      this.swap(parentIdx, currentIdx);
      currentIdx = parentIdx;
    }
  }
  pop() {
    let root = this.heap[0];
    let last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown();
    }
    return root;
  }
  bubbleDown(index = 0) {
    let currentIdx = index;
    let leftChildIdx = currentIdx * 2 + 1;
    let rightChildIdx = currentIdx * 2 + 2;
    let swapIdx = currentIdx;
    let length = this.heap.length;

    if (leftChildIdx < length) {
      if (this.heap[leftChildIdx].priority < this.heap[swapIdx].priority) {
        swapIdx = leftChildIdx;
      }
    }
    if (rightChildIdx < length) {
      if (this.heap[rightChildIdx].priority < this.heap[swapIdx].priority) {
        swapIdx = rightChildIdx;
      }
    }
    if (swapIdx !== currentIdx) {
      this.swap(swapIdx, currentIdx);
      this.bubbleDown(swapIdx);
    }
  }
}
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');

function dijkstra(graph, start, n) {
  const distances = Array(n + 1).fill(Infinity);
  distances[start] = 0;

  const queue = new PriorityQueue();
  queue.push(start, 0); // [시작점, 거리]

  while (queue.size) {
    const { value: currNode, priority: currDist } = queue.pop();

    if (currDist > distances[currNode]) continue;

    for (const [nextNode, nextDist] of graph[currNode]) {
      const dist = currDist + nextDist;
      if (dist < distances[nextNode]) {
        distances[nextNode] = dist;
        queue.push(nextNode, dist);
      }
    }
  }
  return distances;
}

function solution1(input) {
  const [n, m, r] = input[0].split(' ').map(Number); // n:지역의 개수, m:수색범위, r:길(간선)의개수
  const items = input[1].split(' ').map(Number); // 지역별 아이템의 수
  const edges = input.slice(2).map((line) => line.split(' ').map(Number)); // 지역번호 a, b, 거리
  const graph = Array.from({ length: n + 1 }, () => []);

  // 그래프 구성
  for (let i = 0; i < r; i++) {
    const [a, b, dist] = edges[i];
    graph[a].push([b, dist]);
    graph[b].push([a, dist]);
  }

  let max = 0; // 최대 아이템 수
  for (let i = 1; i <= n; i++) {
    const distances = dijkstra(graph, i, n); // 정점i와 모든 정점간의 최단거리
    let sum = 0; // 정점 i와 모든 정점간의 최단거리 중 수색범위 이하의 거리 합산
    for (let k = 1; k <= n; k++) {
      // 수색범위 m 이하의 거리
      if (distances[k] <= m) {
        sum += items[k - 1];
      }
    }
    max = Math.max(max, sum);
  }

  console.log(max);
}

solution1(input);

// 2. 플로이드-와샬 풀이
function solution2(input) {
  const [n, m, r] = input[0].split(' ').map(Number);
  const items = input[1].split(' ').map(Number); // 지역별 아이템의 수
  const edges = input.slice(2).map((line) => line.split(' ').map(Number)); // 지역번호 a, b, 거리
  const distances = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity)); // 모든 정점에 대한 최단경로 테이블

  // 그래프 구성
  for (const [a, b, dist] of edges) {
    distances[a][b] = dist;
    distances[b][a] = dist;
  }

  // 테이블 구성, k 정점을 지나는 각 정점의 최단경로
  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        if (i === j) {
          distances[i][j] = 0;
          continue;
        }
        distances[i][j] = Math.min(distances[i][j], distances[i][k] + distances[k][j]);
      }
    }
  }

  let max = 0; // 최대 아이템 수
  for (let i = 1; i <= n; i++) {
    let sum = 0; // 정점 i와 모든 정점간의 최단거리 중 수색범위 이하의 거리 합산
    for (let j = 1; j <= n; j++) {
      // 수색범위 m 이하의 거리
      if (distances[i][j] <= m) {
        sum += items[j - 1];
      }
    }
    max = Math.max(max, sum);
  }

  console.log(max);
}

solution2(input);
