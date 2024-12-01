// 우선순위 큐, 최소힙
class MinHeap {
  constructor() {
    this.heap = [];
  }
  size() {
    return this.heap.length;
  }
  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }
  push(value, priority) {
    const node = { value, priority };
    this.heap.push(node);
    this.heapifyUp();
  }
  heapifyUp() {
    let currIdx = this.heap.length - 1;
    while (currIdx > 0) {
      const parentIdx = Math.floor((currIdx - 1) / 2);
      if (this.heap[parentIdx].priority <= this.heap[currIdx].priority) break;
      this.swap(parentIdx, currIdx);
      currIdx = parentIdx;
    }
  }
  pop() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.heapifyDown();
    }
    return min;
  }
  heapifyDown(index = 0) {
    const currIdx = index;
    const leftChildIdx = currIdx * 2 + 1;
    const rightChildIdx = currIdx * 2 + 2;
    const len = this.heap.length;
    let swapIdx = currIdx;

    if (leftChildIdx < len) {
      if (this.heap[leftChildIdx].priority < this.heap[currIdx].priority) {
        swapIdx = leftChildIdx;
      }
    }
    if (rightChildIdx < len) {
      if (this.heap[rightChildIdx].priority < this.heap[currIdx].priority) {
        swapIdx = rightChildIdx;
      }
    }
    if (swapIdx !== currIdx) {
      this.swap(swapIdx, currIdx);
      this.heapifyDown(swapIdx);
    }
  }
}

// 다익스트라
function dijkstra(start, graph, distance) {
  distance[start] = 0;

  const heap = new MinHeap();
  heap.push(start, 0);

  while (heap.size() > 0) {
    const { value: node, priority: dist } = heap.pop();

    if (dist > distance[node]) continue; // 최소거리가 아니면 넘어감
    if (graph[node].length === 0) continue;

    for (let [nextNode, weight] of graph[node]) {
      const nextDist = dist + weight;
      if (distance[nextNode] > nextDist) {
        distance[nextNode] = nextDist;
        heap.push(nextNode, nextDist);
      }
    }
  }
}

function solution() {
  const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
  const [V, E] = input[0].trim().split(' ').map(Number); // (1 ≤ V ≤ 20,000, 1 ≤ E ≤ 300,000)
  const start = +input[1]; // start
  let graph = new Array(V + 1).fill(null).map((_) => new Array());
  let distance = new Array(V + 1).fill(Infinity); // 각 노드까지의 최소경로.
  let answer = '';

  // 방향 그래프 구성
  for (let i = 0; i < E; i++) {
    const [u, v, w] = input[i + 2].trim().split(' ').map(Number);
    graph[u].push([v, w]);
  }

  dijkstra(start, graph, distance);

  for (let i = 1; i <= V; i++) {
    if (distance[i] === Infinity) answer += 'INF\n';
    else answer += `${distance[i]}\n`;
  }

  console.log(answer);
}

solution();
