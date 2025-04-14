/* 
입력: 1. 조카의 수 M (1 ≤ M ≤ 1,000,000), 과자의 수 N(1 ≤ N ≤ 1,000,000)
    2. 과자 N개의 길이 (1 ≤ L1, L2, ..., LN ≤ 1,000,000,000)

로직: 
    핵심 아이디어) 막대 과자의길이 L을 정했을 때, 그 길이로 M명에게 공평하게 나눠줄 수 있는가? 판단

    어떻게 이분탐색 문제라는걸 알 수 있는가?
    1. 어떤 길이 L을 기준으로 "가능 / 불가능"을 판단할 수 있다.
    2. L이 커질수록 가능성이 낮아지는 단조함수 성질을 가진다.
    3. 정답이 어느 범위 안의 최대값(또는 최소값) 형태다.
    => 이처럼 단조성을 가지는 값의 범위에서 특정 조건을 만족하는 최댓값/최소값을 찾는 문제는 이분탐색의 전형적인 패턴이다.

    문제 풀이 방법
    
    1. 과자 길이 배열 중 가장 긴 max를 찾는다 max = 가장 긴 길이
    2. 과자 길이 최소 값은 1이기 때문에 min = 1, 
    3. mid를 구하고, 길이 배열에 있는 원소들을 mid로 나눈 몫의 값을 cnt에 더한다. = 과자를 나눈 후 총 개수
    4. 나눈 과자 개수가 조카 수(m)보다 적다면 부족하므로 더 짧은 길이를 시도 (max = mid - 1);
    4. 나눈 과자 개수가 조카 수(m)보다 크거나 같다면 해당 길이로 나눠줄 수 있음 - 더 긴 길이 시도 (min = mid + 1);
    6. 이후 min이 max보다 커질 때까지 반복한다. while문 탈출하면 max는 m명에게 나눌 수 있는 막대과자의 최대 길이가 됨
    
    <시간복잡도> 
    - 이분탐색 - O(log L) (L은 과자의 최대 길이)
    - 각 탐색마다 과자 배열 순회 O(N)
    - 전체 시간복잡도: O(N * log L)

출력: 조카 1명에게 줄 수 있는 막대 과자의 최대 길이 출력
    모든 조카에게 같은 길이의 막대과자를 나눠줄 수 없다면, 0을 출력한다.
*/
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [m, n] = input[0].split(' ').map(Number); // 조카 수 m, 과자 수 n
const sticks = input[1].split(' ').map(Number);

let min = 1;
let max = Math.max(...sticks);
let result = 0;

sticks.sort((a, b) => a - b);

while (min <= max) {
  let mid = Math.floor((max + min) / 2);

  // 모든 막대를 mid 길이로 잘라서 나오는 과자 개수의 합
  let cnt = sticks.reduce((acc, cur) => acc + Math.floor(cur / mid), 0);

  if (cnt >= m) {
    // 과자의 개수가 조카 수(m) 이상이라면 해당 길이로 나눠줄 수 있고, 더 긴 길이를 시도
    min = mid + 1;
  } else {
    // 부족하다면 더 짧은 길이를 시도
    max = mid - 1;
  }
}

console.log(max);
