/**
 * 슬라이딩 윈도우 문제
 * 반례를 잡느라 시간을 많이 소비했다..
 *
 * 반례1) 주어진 수들은 모두 -100 이상 100 이하로 조건에서 음수가 나올 수 있다고 한다.
 * 때문에 총 합의 최소 값을 표현하는 max 값의 초기값을 0으로 지정한다면, 모든 값이 음수로 주어질 때 오답이된다.
 * -> max의 초기값을 주어진 수들의 최소값으로 할당해야한다
 *
 * 반례2)입력값의 형태가 공백으로 주어졌을 때 하나의 공백이 아닌 여러번의 공백이 나오는 반례가 있었음
 * -> 입력값을 받을 때 무조건 split(' ')만으로 받는 것은 불안정할 수 있음
 *
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, k] = input[0].split(' ').map(Number);
const temp = input[1]
  .split(' ')
  .filter((v) => v !== '')
  .map(Number);

let sum = temp.slice(0, k).reduce((a, b) => a + b, 0);
let max = sum;

for (let i = 0; i < n - k; i++) {
  sum += temp[i + k] - temp[i];
  max = Math.max(max, sum);
}

console.log('answer', max);
