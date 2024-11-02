const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const meeting = input.map((times) => times.split(' ').map(Number));

// 1. 회의가 종료 시간을 기준으로 오름차순 정렬
// 2. 회의가 종료 시간이 같다면 시작 시작을 기준으로 오름차순 정렬
meeting.sort((a, b) => {
  if (a[1] === b[1]) return a[0] - b[0];
  return a[1] - b[1];
});

let currentEnd = meeting[0][1];
let answer = 1;

for (let i = 1; i < n; i++) {
  const [start, end] = meeting[i];
  if (start >= currentEnd) {
    answer++;
    currentEnd = end;
  }
}

console.log(answer);
