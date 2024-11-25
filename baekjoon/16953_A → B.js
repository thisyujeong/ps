const input = require('fs').readFileSync('./input.txt').toString().trim().split(' ');
let [a, b] = input.map(Number);

/**
 * 풀이 1
 * `const visited = new Array(b + 1).fill(false);`
 * 위처럼 visited 배열을 생성하여 방문 체크했더니 메모리 초과가 발생했다.
 * -> map 을 활용하여 메모리 사용량 단축
 */
const visited = new Map();

function bfs(v, goal) {
  const queue = [[v, 1]]; // v, cnt
  let head = 0;
  visited.set(v, 1);

  while (head < queue.length) {
    const [cur, cnt] = queue[head++];
    const operator = [cur * 2, parseInt(cur + '1')]; // 2곱하기, 1추가하기

    if (cur === goal) return cnt;

    for (let next of operator) {
      if (visited.has(next) || next > goal) continue;
      queue.push([next, cnt + 1]);
      visited.set(next, 1);
    }
  }
}

console.log(bfs(a, b) || -1);

/**
 * 풀이 2 (다른 사람 풀이 분석)
 * 역으로 b에서부터 차감하면서 a를 찾는 방법
 * 1. b가 2로 나누어 떨어진다면 b를 2로 나누고
 * 2. 나누어떨어지지 앟는다면 b의 일의자리 숫자가 1이라면 b를 10으로 나눈다
 * 3. 2번 조건문도 통과하지 못한다면 a -> b가 될 수 없는 수로 중단.
 * a와 b가 같다면 cnt 반환
 */

let cnt = 1;
let flag = false;
while (a <= b) {
  if (a === b) {
    flag = true;
    break;
  }

  if (b % 2 === 0) b = parseInt(b / 2);
  else if (b % 10 === 1) b = parseInt(b / 10);
  else break;

  cnt++;
}

console.log(flag ? cnt : -1);
