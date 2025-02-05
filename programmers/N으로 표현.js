// N = 5, number = 12
// 1번 사용 = 5
// 2번 사용 = 55, 5+5, 5-5, 5/5, 5*5

// 3번 사용 = 1번 사용한 경우와 2번사용한 경우를 사칙연산,
//           2번 사용한 경우와 1번쓰는 경우 사칙연산
// + 555

// 4번 사용 = 1번 사용한 경우와 3번 사용한 경우를 사칙연산
//          2번 사용한 경우와 2번 사용한 경우 사칙연산
//          3번 사용한 경우와 1번 사용한 경우 사칙연산
// + 5555

// 점화식: count = dp[i] + dp[count - i];
function solution(N, number) {
  const nums = Array.from(new Array(9), () => new Set());

  if (N === number) return 1;

  nums.forEach((el, idx) => {
    if (idx !== 0) el.add(Number(N.toString().repeat(idx)));
  });

  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j < i; j++) {
      for (let item1 of nums[j]) {
        for (let item2 of nums[i - j]) {
          nums[i].add(item1 + item2);
          nums[i].add(item1 - item2);
          nums[i].add(item1 * item2);
          nums[i].add(Math.floor(item1 / item2));
        }
      }
    }

    if (nums[i].has(number)) {
      return i;
    }
  }

  return -1;
}
