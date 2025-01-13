/**
 * TODO: 어렵다 ㅠ 다시 풀어볼 것
 */
function solution(targets) {
  let answer = 0; // 요격 미사일 수
  let end = 0; // 개구간 끝 좌표

  // 개구간의 끝 좌표로 오름차순 정렬
  targets.sort((a, b) => a[1] - b[1]);

  for (let [s, e] of targets) {
    // end 좌표보다 작다면 겹치는 범위가 발생하므로 동일한 미사일에 요격

    // 개구간 시작 좌표(s)가 end 보다 크거나 같은 경우 요격할 수 있음
    // 만약 end 개구간 시작 좌표(s)가 이전에 요격한 좌표와 겹치는 범위가 발생하면 또 요격할 수 없음
    if (end <= s) {
      answer++; // 요격 횟수 추가
      end = e; // 끝 좌표 변경
    }
  }
  return answer;
}
