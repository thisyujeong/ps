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
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  dequeue() {
    const first = this.head.value;
    this.head = this.head.next;
    this.length--;

    if (this.length === 0) this.tail = null;
    return first;
  }

  get size() {
    return this.length;
  }
  get epmty() {
    return this.length === 0;
  }
  get peek() {
    if (this.length === 0) return null;
    return this.head.value;
  }
}

// n: 원하는 강아지 수, m: 닫힌구간 수
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, m, a, b] = input[0].split(' ').map(Number);
const closed = input.slice(1).map((line) => line.split(' ').map(Number));
const dp = new Array(n + 1).fill(Infinity);

// 닫힌 구간
closed.forEach(([start, end]) => {
  for (let i = start; i <= end; i++) {
    dp[i] = -1;
  }
});

// dp[i]에 두번 이상 방문했을 때, 현재 행동 횟수와 같다면 굳이 한 번 더 방문할 필요가 없음
// if (dp[next] === cnt + 1) continue;
// !!!! dfs에서 이 종료조건을 추가하지 않아서 시간초과가 발생 !!!!
//
// queue를 배열로 구현했을 때 shift, pop 하는 과정에서 시간초과가 나는 줄 알았다.
// 직접 class로 Queue를 구현했으나 여전히 시간초과
// --> 불필요한 루프가 실행되고 있음을 파악. -> 종료조건 검토 -> 성공
const dfs = (start) => {
  const queue = new Queue();
  queue.enqueue([start, 0]);

  while (queue.size) {
    const [cur, cnt] = queue.dequeue();

    for (let next of [cur + a, cur + b]) {
      if (dp[next] === -1 || next > n) continue;
      if (dp[next] === cnt + 1) continue;
      let minCount = Math.min(dp[next], cnt + 1);
      dp[next] = minCount;
      queue.enqueue([next, minCount]);
    }
  }
};

dfs(0);

console.log(dp[n] === Infinity ? -1 : dp[n]);
