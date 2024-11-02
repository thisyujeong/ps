/**
 * 연결요소의 개수 구하기
 * n: 정점의 개수, 1 ≤ N ≤ 1,000
 * m: 간선의 개수, 0 ≤ M ≤ N×(N-1)/2
 *    무방향 그래프가 가질 수 있는 최대 간선의 개수: n(n-1)/2 개
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, m] = input.shift().split(' ').map(Number);
const edges = input.map((v) => v.split(' ').map(Number));
const graph = Array.from({ length: n + 1 }, () => []);
const visited = Array.from({ length: n + 1 }).fill(0);
let answer = 0;

for (let i = 0; i < m; i++) {
  const [from, to] = edges[i];
  graph[from].push(to);
  graph[to].push(from);
}

//// 풀이 1. dfs
function dfs(v) {
  for (let next of graph[v]) {
    if (!visited[next]) {
      visited[next] = 1;
      dfs(next);
    }
  }
}

//// 풀이 2. dfs
function bfs(start) {
  const queue = [start];
  visited[start] = 1;
  while (queue.length) {
    const cur = queue.shift();
    for (let next of graph[cur]) {
      if (!visited[next]) {
        queue.push(next);
        visited[next] = 1;
      }
    }
  }
}

//// 풀이 3. 큐를 연결리스트로 구현
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  enqueue(value) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.length++;
  }
  dequeue() {
    const popValue = this.head.value;
    this.head = this.head.next;
    this.length--;
    return popValue;
  }
}

function queueBFS(start) {
  let queue = new Queue();
  queue.enqueue(start);
  visited[start] = 1;

  while (queue.length) {
    const cur = queue.dequeue();
    for (let next of graph[cur]) {
      if (!visited[next]) {
        queue.enqueue(next);
        visited[next] = 1;
      }
    }
  }
}
for (let i = 1; i <= n; i++) {
  if (!visited[i]) {
    // dfs(i);
    // bfs(i);
    queueBFS(i);
    answer++;
  }
}
console.log(answer);
