// 최저 숙련도 1, 최고 숙련도(K) 100,000
// diffs.length(n) <= 300,000
// 브루트포스 - 최악의 경우 300억번의 연산이 발생 - 시간초과

// 이분탐색? - O(nlogn)
// 탐색 범위 O(log K), 각 탐색에서 퍼즐 검증 O(n)
// K = 100,000 (log 100,000 ≈ 17), n = 300,000
// O(log K·n) = O(17·300,000) = 5,100,000 (510만번 연산)

function solution(diffs, times, limit) {
  let start = 1;
  let end = 100000;

  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    let isValid = calc(mid, diffs, times, limit);
    if (isValid) end = mid - 1; // 시간 내에 풀 수 있다면 더 낮은 숙련도를 확인
    else start = mid + 1; // 시간 내에 풀 수 없다면 더 높은 숙련도를 확인
  }
  return start;
}

function calc(level, diffs, times, limit) {
  let result = 0; // 전체 소요시간
  for (let i = 0; i < diffs.length; i++) {
    if (level >= diffs[i]) {
      result += times[i];
    }
    if (level < diffs[i]) {
      let cnt = diffs[i] - level;
      let amount = (times[i] + times[i - 1]) * cnt + times[i];
      result += amount;
    }

    if (result > limit) return false;
  }

  return true;
}
