/**
 * 그리디
 * 입력: 무게가 양의 정수인 N개의 저울추
 *      저울의 한쪽은 저울추만 놓을 수 있고, 다른쪽은 무게를 측정하려는 물건만 올려놓는다.
 *      3, 1, 6, 2, 7, 30, 1인 7개의 저울추가 주어진다면, 이 추들로 축정할 수 없는 양의 정수는는 21
 *
 *      첫 째 줄에는 저울추의 개수를 나타내는 양의 정수 N이 주어진다.
 *      둘째 줄에는 저울추의 무게를 나타내는 N개의 양의 정수가 빈칸을 사이에 두고 주어진다.
 *
 *      저울추는 최대 10,000개, 각 저울추 무게는 최대 1,000,000
 *
 * 로직: 그리디
 *      1. 오름차순 정렬 후, 누적 가능한 무게의 최대값을 추적한다.
 *      2. 다음 무게가 현재 누적된 최대값보다 크면 측정할 수 없는 최소 무게가 됨
 *        - target 은 지금까지 만들 수 있는 연속된 무게의 "다음 숫자"
 *        - 정렬된 추들에서 다음 추가 target보다 작거나 같으면 -> target을 포함한 더 큰 무게까지 만들 수 있음
 *        - 하지만 다음 추 > target이면? -> 지금 있는 추로는 target 무게를 만들 방법이 없음
 *        -  그 무게보다 작은 추는 이미 다 사용했기 때문
 *
 *      정렬된 저울추: [1, 1, 2, 3, 6, 7, 30]
 *      1번 저울추 1 -> 1까지의 무게를 측정 가능
 *      2번 저울추 1 -> 1과 (1+1=2) 를 측정 가능 => 1, 2
 *      3번 저울추 2 -> 1, 2, (1+2=3), (1+1+2=4) 측정가능 => 1, 2, 3, 4
 *      4번 저울추 3 -> 1, 2, 3, 4, (1+3=4), (2+3=5), (1+2+3=6), (1+1+2+3=7) => 1, 2, 3, 4, 5, 6, 7
 *      5번 저울추 6 -> 이전까지 만들 수 있는 무게에 67을 더해 13까지 측정 가능
 *      6번 저울추 7 -> 이전까지 만들 수 있는 무게에 7을 더해 20까지 측정 가능
 *      7번 저울추 30 -> 현재까지 만들 수 있는 최대 무게 20보다 크다. 21이 측정할수 없는 최소 무게가 됨
 *
 *    -> 시간복잡도 N(log N) - 정렬, 한번 순회
 *
 * 출력: 주어진 저울추들로 측정할 수 없는 양의 정수 무게중 최솟값
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input[0];
const weights = input[1].split(' ').map(Number);
weights.sort((a, b) => a - b);

let target = 1; // 지금까지 만들 수 있는 연속된 무게의 "다음 숫자"

for (let i = 0; i < n; i++) {
  if (weights[i] > target) break;
  target += weights[i];
}

console.log(target);
