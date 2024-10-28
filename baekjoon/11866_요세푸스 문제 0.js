const input = require('fs').readFileSync('./input.txt').toString().trim().split(' ');
const [n, k] = input.map(Number);
const numbers = Array.from({ length: n }, (_, i) => i + 1);
const result = [];
let index = 0;

/**
 * 풀이 1
 * 숫자 배열의 첫번째 원소를 shift하면서 해당 원소가 제거 대상인지 검토하는 방식으로 구현
 * shift 함수는 O(n)의 시간복잡도를 갖지만, while 반복문으로 인해 loop 실행횟수 * O(n)의 시간복잡도를 갖는다.
 */
while (numbers.length > 0) {
  let current = numbers.shift();

  index++;
  if (index % k === 0) result.push(current);
  else numbers.push(current);
}

console.log('<' + result.join(', ') + '>');

/**
 * 풀이 2
 * 숫자 배열의 첫 번째 원소마다 검토하는것이 아니라,
 * 숫자 배열의 k 번째 원소에 바로 접근하면서 loop 실행횟수를 감소시킨다. -> loop 실행횟수 * O(1)
 * 해당하는 원소만 제거 O(n)
 *
 * 풀이1과 2를 비교했을때 풀이1의 실행시간은 풀이2의 실행시간에 비하여 2배 높다.
 */
while (numbers.length > 0) {
  index = (index + k - 1) % numbers.length;
  result.push(numbers[index]);
  numbers.splice(index, 1);
}

console.log('<' + result.join(', ') + '>');
