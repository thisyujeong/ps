const MAX_HEIGHT = 256;
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, M, B] = input.shift().split(' ').map(Number); // N:세로, M:가로, B:인벤토리 내 블록 수
const ground = input.map((v) => v.split(' ').map(Number));
const answer = [];

for (let k = 0; k <= MAX_HEIGHT; k++) {
  let target = k;
  let time = 0;
  let blocks = B;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const current = ground[i][j];
      // 목표 높이보다 낮다면 쌓기 (1초)
      if (target > current) {
        time += target - current;
        blocks -= target - current;
      }
      // 목표 높이보다 높다면 제거 (2초)
      if (target < current) {
        time += (current - target) * 2;
        blocks += current - target;
      }
    }
  }

  // 남은 블록이 음수면 불가능한 높이
  if (blocks < 0) continue;
  answer.push([time, target]);
}

// 시간 짧은 순 정렬, 시간이 같다면 높은 층 순 정렬
answer.sort((a, b) => {
  if (a[0] === b[0]) return b[1] - a[1];
  return a[0] - b[0];
});

console.log(answer[0].join(' '));

/**
 * TODO: 개선
 * 풀이 1에서 목표 높이를 0부터 256까지 높여가며 탐색을 진행했으나,
 * 목표 높이를 256에서 0까지 1씩 차감하면서 실행하면 불필요한 실행을 막을 수 있음
 * - 블록을 쌓는 작업(add)는 횟수를 감소하고 (1초)
 * - 블록을 제거하는 작업(remove)는 횟수를 증가한다.(2초)
 * 높이를 낮춰나가다가 특정 높이에서 높이를 낮출수록 반드시 작업 시간이 증가하게 되어있다.
 * 따라서 불필요한 반복을 줄이기 위해 최초 1회(높이 256)를 제외하고
 * 작업 시간이 이전 시간보다 증가한 경우 반복문을 탈출한다.
 */
