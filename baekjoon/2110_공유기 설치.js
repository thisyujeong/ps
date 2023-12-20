/**
 * 문제부터 이해가 안돼서 다음 영상으로 이해함
 * https://www.youtube.com/watch?v=Wbhwlf4stfY
 *
 * [입력조건]
 * N, C(2 ~ 20만)
 * xi(0 <= xi < 1,000,000,000) -> 이정도의 범위는 오히려 힌트가 될 수 있다.
 * 집 사이의 거리가 10억이 나올 수도 있다는 것은 높은 확률로 이분탐색 문제
 *
 * 가장 왼쪽 집부터 공유기를 설치해야, 최대한 멀게 설치할 수 있다.
 * = 가장 왼쪽 집은 반드시 공유기를 설치해야 함
 *
 * 1. 공유기 사이 거리를 x라고 가정, x를 기준으로 공유기 설치
 * 2. 공유기를 C개 이상 설치할 수 있다 -> 공유기 사이 거리를 더 넓혀도 된다는 의미
 * 3. 반대로 공유기를 C개 이상 설치할 수 없다면 -> 공유기 사이 거리를 좁혀야한다는 의미
 * ==> 따라서 x보다 짧은 거리는 볼 필요 없이 거리를 늘려 최댓값 확인!
 * ==> 가장 인접한 두 공유기 사이의 최대 거리를 기준(피봇)으로 탐색
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, c] = input.shift().split(' ').map(Number); // n = 집 개수, c = 공유기 개수
const coord = input.map(Number).sort((a, b) => a - b); // 집의 좌표를 오름차순으로 정렬

// 가장 인접한 두 공유기 사이의 최대 거리를 기준으로 탐색
let start = 1; // 나올 수 있는 최소 거리
let end = coord.at(-1) - coord[0]; // 나올 수 있는 최대 거리 => 마지막 좌표 - 첫번째 좌표

while (start <= end) {
  let mid = Math.floor((start + end) / 2);

  let count = 1; // 설치한 공유기 개수
  let prev = coord[0]; // 이전 집

  for (const cur of coord) {
    // 현재 집과 이전 집의 거리가 mid(공유기 거리) 보다 작다면 탐색할 필요가 없다.
    if (cur - prev < mid) continue;

    // 현재 집과 이전 집의 거리가 mid(공유기 거리) 보다 크다면
    // 공유기 개수를 추가하고, 이전 집을 현재 집으로 갱신
    prev = cur;
    count += 1;
  }

  // 설치한 공유기 개수가 설치해야할 공유기 개수 보다 적다면
  // mid 공유기 거리를 좁혀 재탐색
  if (count < c) end = mid - 1;
  // 반대로 크다면 mid 공유기 늘려 재탐색
  else start = mid + 1;
}

console.log(end);
