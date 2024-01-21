/**
 * 1. 주어진 회의 리스트를, 회의가 끝나는 시간을 기준으로 오름차순 정렬한다.
 *    -> 회의가 끝나야만 다음 회의가 진행될 수 있기 때문
 *    -> 종료 시간이 같을 경우 시작 시간을 기준으로 정렬
 * 2. 정렬된 회의 리스트를 기준으로 반복문을 통해 n번째 회의의 종료 시간과, n+1번째 회의 시작 시간을 비교한다.
 *    -> n번째 회의 종료시간보다 다음 회의의 시작 시간이 크거나 같아야 함.
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const meeting = input.map((m) => m.split(' ').map(Number));

// 회의 종료 시간을 기준으로 오름차순 정렬
// 종료 시간이 같다면 시작 시간을 기준으로 오름차순 정렬
meeting.sort((a, b) => (a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]));

let cnt = 1; // 회의 개수 카운팅 변수
let cur = meeting[0][1]; // 첫번째 회의의 종료시간

// 두번째 회의부터 비교대상이므로 반복문 1부터 시작
for (let i = 1; i < n; i++) {
  // 다음 회의 시작 시간이 현재 회의 종료시간보다 크거나 같을 경우
  if (meeting[i][0] >= cur) {
    cur = meeting[i][1]; // 다음 회의의 종료 시간을 현재 회의 종료시간으로 갱신
    cnt++; // 회의 개수 카운팅
  }
}

console.log(cnt);
