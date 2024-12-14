/* 성능 개선 필요 - 런타임이 너무 길다 */

// 가중치 그래프 - 다익스트라 - 우선순위 큐 구현
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
      if (this.heap[parentIdx].priority <= this.heap[currentIdx].priority) break;
      this.swap(currentIdx, parentIdx);
      currentIdx = parentIdx;
    }
  }
  pop() {
    let first = this.heap[0];
    let last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown();
    }
    return first;
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

function dijkstra(start, end, graph, n) {
  const distances = Array(n + 1).fill(Infinity);
  distances[start] = 0;

  const queue = new PriorityQueue();
  queue.push(start, 0);

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
  return distances[end];
}

function solution(input) {
  const [N, M, X] = input[0].split(' ').map(Number); // N:학생수, M:단방향 도로 수, X:모이는 마을
  const arr = input.slice(1).map((line) => line.split(' ').map(Number)); // [시작점, 끝점, 소요시간]
  const graph = Array.from({ length: N + 1 }, () => []);

  for (let i = 0; i < M; i++) {
    const [start, end, time] = arr[i];
    graph[start].push([end, time]);
  }

  let max = 0;
  for (let i = 1; i <= N; i++) {
    const goDist = dijkstra(i, X, graph, N); // 가는 길
    const returnDist = dijkstra(X, i, graph, N); // 돌아오는 길

    console.log(goDist, returnDist);
    max = Math.max(max, goDist + returnDist);
  }

  return max;
}

const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
console.log(solution(input));
