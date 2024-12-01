/**
 * TODO: 다익스트라 유형 연습
 * 다익스트라
 * 1. 시작점을 기준으로 다익스트라 실행
 * 2. 정점1을 기준으로 다익스트라 실행
 * 3. 정점2를 기준으로 다익스트라 실행
 * 시간복잡도 = 3 * O(NlogN) (모든 정점을 한 번씩 검사)
 */
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
  insert(value, priority) {
    const node = { value, priority };
    this.heap.push(node);
    this.heapifyUp();
  }
  heapifyUp() {
    let currentIdx = this.length - 1;
    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);
      if (this.heap[parentIdx].priority <= this.heap[currentIdx].priority) break;
      this.swap(parentIdx, currentIdx);
      currentIdx = parentIdx;
    }
  }
  delete() {
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

function dijkstra(N, start, graph) {
  const distance = new Array(N + 1).fill(Infinity);
  distance[start] = 0;

  const heap = new Heap();
  heap.insert(start, 0);

  while (heap.size) {
    let { value: curNode, priority: curDist } = heap.delete();
    for (let next = 1; next < graph[curNode].length; next++) {
      let nextNode = next;
      let nextDist = curDist + graph[curNode][next];
      if (distance[nextNode] > nextDist) {
        distance[nextNode] = nextDist;
        heap.insert(nextNode, distance[nextNode]);
      }
    }
  }

  return distance;
}

function solution() {
  const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
  const [N, E] = input[0].split(' ').map(Number); // 2 ≤ N ≤ 800, 0 ≤ E ≤ 200,000 (2^5)
  const [v1, v2] = input[E + 1].split(' ').map(Number); // 지나야하는 정점

  // 무방향 그래프 구성
  // 각 정점으로부터 최대 800개의 정점에 이르는 거리를 저장하는 그래프 배열을 생성 (메모리를 미리 생성)
  // => 실행시간이 단축됨
  let graph = new Array(801).fill(null).map((_) => new Array(801).fill(Infinity));
  for (let i = 1; i <= E; i++) {
    const [a, b, dist] = input[i].split(' ').map(Number);
    graph[a][b] = dist;
    graph[b][a] = dist;
  }
  const start = dijkstra(N, 1, graph); // start → 각 정점간의 최단 거리
  const x = dijkstra(N, v1, graph); // v1 → 각 정점간의 최단거리
  const y = dijkstra(N, v2, graph); // v2 → 각 정점간의 최단 거리

  const d1 = start[v1] + x[v2] + y[N]; // start → v1 → v2 → end
  const d2 = start[v2] + y[v1] + x[N]; // start → v2 → v1 → end

  if (d1 === Infinity && d2 === Infinity) return -1;
  return d1 < d2 ? d1 : d2;
}

console.log(solution());
