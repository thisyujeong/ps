const N = +require('fs').readFileSync('./input.txt').toString().trim();

/* 풀이 1 - DP 풀이 */
const sugar = new Array(N + 1).fill(-1);
sugar[3] = 1; // 3kg
sugar[5] = 1; // 5kg

for (let i = 6; i <= N; i++) {
  // sugar[n-3]과 sugar[n-5] 모두 0보다 클경우
  if (sugar[i - 3] > 0 && sugar[i - 5] > 0) {
    sugar[i] = Math.min(sugar[i - 3], sugar[i - 5]) + 1;
    continue;
  }
  // sugar[n-3]과 sugar[n-5] 모두 0보다 작을 경우
  if (sugar[i - 3] < 0 && sugar[i - 5] < 0) {
    sugar[i] = -1;
    continue;
  }
  // sugar[n-3]과 sugar[n-5] 중 하나만 0보다 작을 경우
  sugar[i] = Math.max(sugar[i - 3], sugar[i - 5]) + 1;
}
console.log(sugar[N]);

/* 풀이 2 - 수학 풀이 (loop) */
let sugar2 = N;
let count = 0;

while (true) {
  // 5kg로 나누어떨어지면
  if (sugar2 % 5 === 0) {
    count += Math.floor(sugar2 / 5); // 5kg 묶음 개수 추가
    break;
  }

  sugar2 -= 3; // 5kg로 나누어떨어지지 않다면 3kg을 뺌
  count += 1; // 3kg 봉지 개수 추가

  // 정확히 나눌 수 없는 경우
  if (sugar2 < 0) {
    count = -1;
    break;
  }
}

console.log(count);
