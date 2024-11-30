const input = require('fs').readFileSync('./input.txt').toString().trim().split(' ');
const [N, K] = input.map(Number); // N:수빈, K:동생

// 이동 방식에 따라 소요되는 시간이 다름. 순간이동(x2)하는 경우 0초가 소요되므로 최우선으로 처리해야 한다.(우선순위 큐)
function bfs(n, k) {
  const visited = Array.from({ length: 100001 }, () => false);
  const queue = [[n, 0]]; // [출발점, 가중치]
  let head = 0;
  visited[n] = true;

  while (head < queue.length) {
    const [cur, time] = queue[head++];
    // 목적지 도착 시 중단하고 시간 반환
    if (cur === k) return time;
    // 다음 방문 탐색 (순간이동, 뒤로 걷기, 앞으로 걷기)
    for (const next of [cur * 2, cur - 1, cur + 1]) {
      if (!visited[next] && next >= 0 && next < 100001) {
        visited[next] = true; // 방문처리
        // 순간이동(x2)할 경우 시간은 증가하지 않고, 우선순위를 반영해 큐의 맨 앞 반영
        // 큐를 shift하는 대신 head 변수를 증감하여 사용했으므로 head값을 차감하고 해당 위치에 값을 반영함
        if (next === cur * 2) queue[--head] = [next, time];
        // 걷는 경우(-1, +1) 시간을 증가하고 큐에 다음 방문 예정 노드와 시간을 추가
        else queue.push([next, time + 1]);
      }
    }
  }
}

console.log(bfs(N, K));

// 다른 풀이 분석 - 큐를 직접 구현
// 인덱스 값만을 변경하여 enqueue, dequeue를 구현함
// visited 배열을 통해 방문 체크와 동시에 소요 시간을 저장함
class Queue {
  constructor() {
    this.queue = [];
    this.head = 0;
    this.tail = 0;
  }

  enqueue(node) {
    this.queue[this.tail++] = node;
  }
  dequeue() {
    return this.queue[this.head++];
  }
  get empty() {
    return this.head === this.tail;
  }
}

function other_bfs(n, k) {
  const visited = Array.from({ length: 100001 }, () => -1); // 방문여부 및 최단 시간 저장 (-1: 미방문)
  const queue = new Queue();
  queue.enqueue(n); // 시작점(수빈의 위치)
  visited[n] = 0; // 수빈의 초기 위치 방문 처리

  while (!queue.empty) {
    const cur = queue.dequeue();
    if (cur === k) return visited[cur];

    // 다음 방문 탐색 (순간이동, 뒤로 걷기, 앞으로 걷기)
    for (const next of [cur * 2, cur - 1, cur + 1]) {
      // 미방문 위치(-1)만 방문처리, 유효범위 체크
      if (visited[next] === -1 && next >= 0 && next < 100001) {
        // 순간이동 시 소요시간 0
        if (next === cur * 2) {
          queue.enqueue(next);
          visited[next] = visited[cur];
        }
        // 걷을 경우 소요시간 +1
        else {
          queue.enqueue(next);
          visited[next] = visited[cur] + 1;
        }
      }
    }
  }
}

console.log(other_bfs(N, K));
