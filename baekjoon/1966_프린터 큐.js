const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const T = +input.shift();

/**
 * 풀이 1
 * queue에 목표 문서의 위치를 함께 저장
 * queue: { priority, index }[]
 * array.some() 함수는 시간복잡도 O(n)이므로 풀이2 보다 실행시간이 오래걸림. O(n)
 * while loop 실행 횟수 * O(n)
 */
for (let i = 0; i < T; i++) {
  const priorities = input[i * 2 + 1].split(' ').map((v) => +v); // 프린트 대기열
  const location = input[i * 2].split(' ').map(Number)[1]; // 목표 문서의 위치
  const queue = priorities.map((priority, index) => ({ priority, index })); // 큐 구성
  let count = 1;

  while (true) {
    let current = queue.shift();

    // O(n)
    if (queue.some((doc) => current.priority < doc.priority)) {
      queue.push(current);
      continue;
    }
    if (current.index === location) break;
    count++;
  }

  console.log(count);
}

/**
 * 풀이 2
 * queue와 목표 문서의 위치 정보를 별도 변수로 나누어 관리
 */
for (let i = 0; i < T; i++) {
  const queue = input[i * 2 + 1].split(' ').map(Number); // 프린트 대기열
  let location = input[i * 2].split(' ').map(Number)[1]; // 목표 문서의 위치
  let count = 1;

  while (true) {
    // 우선순위가 가장 높은 값
    const max = Math.max(...queue);
    const current = queue.shift();

    // 첫번째 원소의 우선순위가 가장 높다면
    if (current === max) {
      if (location === 0) break;
      count++;
    }
    // 첫번째 원소의 우선순위가 낮다면 맨 뒤로 이동
    else {
      queue.push(current);
    }

    // 목표 문서의 위치가 0번이라면 맨 뒤로 이동
    if (location === 0) {
      location = queue.length - 1;
      continue;
    }

    // 목표 문서 위치 한칸 앞으로
    location--;
  }

  console.log(count);
}
