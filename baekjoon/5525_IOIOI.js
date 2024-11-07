/**
 * 서브태스크
 * 1. N ≤ 100, M ≤ 10 000. (50점)
 * 2. 추가적인 제약 조건이 없다. (50점)
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const N = +input[0]; // N+1개의 I, N개의 O, 1 ≤ N ≤ 1,000,000
const M = +input[1]; // 문자열 S의 길이, 2N+1 ≤ M ≤ 1,000,000
const S = input[2];

/**
 * 슬라이딩 윈두우? 브루트포스?
 * 문자열 길이가 N이고, 패턴의 길이가 M(3이상의 홀수)라고할때
 * 브루트 포스 방식으로 문자를 하나씩 순회할 때마다 일일히 패턴 길이를 순회해서 일치하는지 검사를 하게되면
 * O(N*M)의 시간이 걸리게 되므로 서브태스크 1번만 만족하게됨
 */
let p = ''; // 문자열 Pn 생성
for (let i = 0; i <= N * 2; i++) {
  p += i % 2 === 0 ? 'I' : 'O';
}
function solution1(p) {
  let left = 0;
  let right = p.length;
  let count = 0;
  while (right <= M) {
    if (S.slice(left++, right++) === p) count++;
  }
  return count;
}

console.log(solution1(p));

/**
 * 위의 풀이와 같이 모든 경우를 다 비교하는 경우는 최악의 경우 엄청난 시간이 소요된다.
 * 따라서 모든 경우를 비교하지 않아도 패턴을 찾아낼 수 있는 kmp 알고리즘을 사용할 수 있어야 한다.
 *
 * KMP 알고리즘 (문자열 매칭 알고리즘)
 * kmp 알고리즘의 핵심은 패턴의 <접두사와 접미사 개념을 적극 활용>하여'반복되는 연산을 얼만큼 건너뛸 수 있는지'에 대해 집중한다는 것이다.
 * 패턴 내에 존재하는 <접두사와 접미사가 '일치'한다면 접미사를 접두사로 다시 바라봄으로써 문자열 탐색을 이어서 진행할 수 있기 때문>이다.
 * https://velog.io/@rhdmstj17/KMP-알고리즘-python-문자열-탐색-가장-쉽게-이해해보기
 *
 */
function solution() {
  let answer = 0;
  let count = 0; // 패턴의 길이 체크 (count가 1이라면 IOI, count가 2라면 IOIOI, ...)
  let index = 0;
  while (index < M - 1) {
    // N이 1이라면 IOI를, N이 2라면 IOIOI, ... 의 패턴으로 찾아야한다.
    // IOI 하나의 패턴만 찾고 일치한다면 count + 1 한다.
    // 즉 count와 N이 같다는 말은 길이가 같은 패턴을 찾았다는 의미
    if (S.slice(index, index + 3) === 'IOI') {
      count += 1;
      index += 2; // 현재 인덱스 + 2번째 인덱스를 탐색

      // 목표 문자열과 길이가 같은지 확인
      if (count == N) {
        count--;
        answer++;
      }
    } else {
      // IOI 패턴이 아니라면 다음 인덱스부터 탐색
      index++;
      count = 0;
    }
  }

  return answer;
}

console.log(solution());
