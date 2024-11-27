/**
 * 가중치 그래프, 최단경로(비용)가 나온다 -> 데익스트라 문제 -> 우선순위 큐 사용
 * start -> end 최소 비용 구하기
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');

class Heap {
  constructor() {
    this.heap = [];
  }
  get size() {
    return this.heap.length;
  }
  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }
  enqueue(value, priority) {
    const node = { value, priority };
    this.heap.push(node);
    this.heapifyUp();
  }
  heapifyUp() {
    let currentIdx = this.heap.length - 1;
    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);
      if (this.heap[parentIdx].priority <= this.heap[currentIdx].priority) break;
      this.swap(parentIdx, currentIdx);
      currentIdx = parentIdx;
    }
  }
  dequeue() {
    const root = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.heapifyDown();
    }
    return root;
  }
  heapifyDown(index = 0) {
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
      this.heapifyDown(swapIdx);
    }
  }
}

// 다익스트라 최소비용 구하기
function dijkstra(graph, start, end) {
  // 시작노드부터 각 노드에 도달할때 까지의 최소비용(거리)
  const distance = new Array(graph.length).fill(Infinity);
  distance[start] = 0;

  const q = new Heap();
  q.enqueue(start, 0); // 시작점 도시번호, 가중치

  while (q.size) {
    // 현재 노드, 현재 노드까지의 비용
    const { value: cur, priority: dist } = q.dequeue();

    // 현재 노드까지의 비용이 이미 기록된 비용보다 크다면 탐색할 필요 없음
    if (distance[cur] < dist) continue;

    for (let [nextNode, nextDist] of graph[cur]) {
      const cost = dist + nextDist;
      if (cost < distance[nextNode]) {
        distance[nextNode] = cost;
        q.enqueue(nextNode, cost);
      }
    }
  }

  return distance[end];
}

function solution(input) {
  const N = +input[0]; // 도시의 개수
  const M = +input[1]; // 버스의 개수
  const arr = input.slice(2, M + 2).map((v) => v.split(' ').map(Number));
  const [start, end] = input[M + 2].split(' ').map(Number);
  const graph = Array.from({ length: N + 1 }, () => []);

  // 가중치 그래프 구성
  for (let i = 0; i < M; i++) {
    const [from, to, cost] = arr[i];
    graph[from].push([to, cost]); // 출발도시: [도착도시, 비용]
  }

  console.log(dijkstra(graph, start, end));
}

solution(input);
