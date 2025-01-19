function solution(x, y, n) {
  let dp = new Array(y + 1).fill(Infinity);
  dp[x] = 0;

  if (x === y) return 0;

  for (let i = x; i <= y; i++) {
    if (i - n >= x) dp[i] = Math.min(dp[i], dp[i - n] + 1);
    if (i % 2 === 0 && i / 2 >= x) dp[i] = Math.min(dp[i], dp[i / 2] + 1);
    if (i % 3 === 0 && i / 2 >= x) dp[i] = Math.min(dp[i], dp[i / 3] + 1);
  }

  return dp[y] === Infinity ? -1 : dp[y];
}

/* 다른 사람 풀이 */
// bfs 알고리즘 사용
function solution(x, y, n) {
  if (x === y) return 0;
  const dp = {};
  dp[x] = 0;
  let data = [x];
  while (data.length) {
    const newData = [];
    for (const d of data) {
      for (const e of [d + n, d * 2, d * 3]) {
        if (e > y || dp[e]) continue;
        if (e === y) return dp[d] + 1;
        dp[e] = dp[d] + 1;
        newData.push(e);
      }
    }
    data = newData;
  }
  return -1;
}

/* bfs 시간초과 개선 (queue 구현) */
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
  get size() {
    return this.length;
  }
  push(value) {
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
  shift() {
    const first = this.head.value;
    this.head = this.head.next;
    this.length--;

    return first;
  }
}

function solution(x, y, n) {
  let result = -1;
  const q = new Queue();
  q.push([y, 0]);

  while (q.length !== 0) {
    const [value, step] = q.shift();
    if (value <= x) {
      if (value === x) result = step;
      break;
    }

    if (value - n >= x) q.push([value - n, step + 1]);
    if (value % 2 === 0 && value / 2 >= x) q.push([value / 2, step + 1]);
    if (value % 3 === 0 && value / 3 >= x) q.push([value / 3, step + 1]);
  }

  return result;
}
