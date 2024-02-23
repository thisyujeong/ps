const fs = require('fs');
const [t, ...input] = fs.readFileSync('./input.txt').toString().trim().split('\n');
let visited = [];
let changed = [];

/* 소수 판별하는 함수  */
function isPrime(n) {
  // 자연수의 제곱근 이하의 수까지 검사하면 검사 범위를 줄일 수 있음
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) return false;
  }
  return true;
}

function bfs(from, to) {
  const queue = [from];
  visited[from] = 1;
  changed[from] = 0;

  while (queue.length) {
    const cur = queue.shift();

    // 네자리로 구성된 각 숫자를 변경을 위함
    for (let i = 0; i < 4; i++) {
      // 각 숫자를 0~9로 변경을 위함
      for (let n = 0; n < 10; n++) {
        // i번째 수를 0~9로 변경한 숫자 (다음에 방문할 숫자)
        const next = cur.slice(0, i) + String(n) + cur.slice(i + 1);

        /**
         * ✓ continue 조건
         * 다음 숫자가 1000보다 작거나
         * 다음 숫자가 9999보다 크거나
         * 다음 숫자가 이미 탐색한 숫자이거나
         * 다음 숫자가 소수가 아닌경우
         * -> && 연산자를 사용해 탐색했더니 무한루프 수준으로 오래걸렸다.
         * -> 탐색 횟수를 줄이기 위해 || 연산자를 사용했다.
         */
        if (next < 1000 || next > 9999 || visited[next] || !isPrime(next)) continue;

        visited[next] = 1; // 다음 숫자 방문처리
        changed[next] = changed[cur] + 1; // 다음 숫자가 되기까지의 변경횟수
        queue.push(next);

        if (next == to) return; // 목표하는 숫자와 같다면 bfs 중지
      }
    }
  }
}

// 각 테스트 케이스 순환
input.forEach((tc) => {
  const [from, to] = tc.split(' ');
  visited = new Array(10000).fill(0); // 방문처리 초기화
  changed = new Array(10000).fill(-1); // 변경횟수 초기화
  bfs(from, to);
  console.log(changed[to] == -1 ? 'Impossible' : changed[to]);
});
