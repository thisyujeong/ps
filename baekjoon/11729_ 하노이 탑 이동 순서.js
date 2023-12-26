/**
 * 다음 글 참고
 * https://nyang-in.tistory.com/210
 * 원반이 이동하는 순서를 이해하는데 어려움이 있었음
 *
 * 맨 아래 원반을 목적지로 이동시킴
 * - 원반의 개수가 몇개이던 간에, 맨 아래의 원반이 시작지점에서 목표(to) 기둥에 도달해야하는 것은 필수 과정
 * - 그러려면 맨 아래 원반을 제외한 원반들이 시작(from) 지점에서 나머지(other) 기둥에 위치해야 함
 * - 맨 아래 원반이 목표로하는 지점에 도달 한 다음에는 나머지 원반들이 나머지(other) 기둥에서 목표(to)기둥에 가야함
 *
 * 띠리서,
 * 1) 맨 아래 원반을 시작 기둥(from)에서 목표(to)기둥으로 옮김
 * 2) 맨 아래 원반을 제외한 나머지 원반들이 시작(from) 기둥에서 나머지(other)기둥으로 옮겨져 있어야 함
 * 3) 나머지 원반들을 나머지(other)기둥에서 목표(to)기둥으로 옮김
 *
 * TODO: 다시 풀어볼 것, 이해하기
 */
const n = +require('fs').readFileSync('./input.txt').toString().trim();
const orders = [];

/**
 * @param {number} n - 원반의 개수
 * @param {number} from - 출발 기둥 번호
 * @param {number} to - 목표 기둥 번호
 * @param {number} other - 나머지 기둥 번호
 */
const move = (n, from, to, other) => {
  // 종료 조건
  if (n === 1) {
    // 원반의 개수가 1개라면 바로 목표 기둥으로 이동할 수 있음
    orders.push([from, to]);
    return;
  }

  // 원반 개수보다 하나 적은 원반들을 목적지가 아닌 곳으로 재귀적으로 이동
  move(n - 1, from, other, to);
  // 맨 아래의 원반을 목적지로 이동
  orders.push([from, to]);
  // 다른 곳으로 옮겼던 원반들을 맨 아래 원반위로 이동
  move(n - 1, other, to, from);
};

move(n, 1, 3, 2);
console.log(orders.length);
console.log(orders.map((order) => order.join(' ')).join('\n'));
