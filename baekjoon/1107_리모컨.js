/**
 * TODO: 다시 풀어야할 문제
 * 현재 채널: 100번
 * 1. 주어진 채널이 100인 경우 = 현재 채널과 같으므로 0 반환
 * 2. (주어진 값에서 가려고하는 값까지 +, - 버튼을 누른 횟수) + 시작한 값의 길이
 * 3. 100에서 +, - 만 사용하여 주어진 채널까지 누른 횟수
 */

/* 다른사람 풀이 분석 ====================================================================== */
const [n, m, brokens] = require('fs')
  .readFileSync('./input.txt')
  .toString()
  .trim()
  .split('\n');

function solution() {
  // 주어진 채널이 100인 경우, 채널 변동 없음 - 0 번
  if (n === '100') return 0;

  // 고장난 버튼이 있는 경우
  let brokenKey = brokens?.split(' ') || [];
  let answer = Math.abs(100 - n); // +, - 버튼만 사용했을 경우 횟수

  /**
   * n의 범위는 500,000이다. 하지만 채널의 범위는 무제한이라는 것에 주의해야한다.
   * 이는 500,000보다 큰 채널에서 500,000 채널로 올 수도 있다는 뜻
   * 시작 채널이 100이므로  500,000 - 100 = 499,900 이다.
   * 500,000 + 499,900 = 999,900 이지만, 이보다 큰 채널은 100번 채널에서
   * +, - 만 사용해서 이동할 때보다 무조건 많은 횟수의 버튼을 눌러야하므로 살펴볼 필요가 없음
   */
  for (let i = 0; i < 999900; i++) {
    const str = i.toString();
    let isValid = true;

    for (let j = 0; j < str.length; j++) {
      // +, - 만으로 이동할 수 있는 수인지 확인
      if (brokenKey?.includes(str[j])) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      // +, - 버튼만 사용한 횟수와 숫자, +, - 버튼 모두 사용했을 경우 횟수를 비교
      answer = Math.min(answer, Math.abs(i - n) + str.length);
    }
  }

  return answer;
}

console.log(solution());

/* 실패한 풀이 ============================================================================
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input[0]; // channel
const m = +input[1]; // 고장난 버튼 수
const numberKey = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let pressed = [];

function solution() {
  const channel = input[0].split('').map(Number);

  if (n === 100) return 0;
  if (m === 0) return channel.length;
  if (98 <= n && n <= 103) return Math.abs(n - 100);

  const brokenKey = input[2].split(' ').map(Number);
  const normalKey = {};
  numberKey.forEach((num) => {
    normalKey[num] = !brokenKey.includes(num);
  });

  channel.forEach((num) => {
    if (normalKey[num]) {
      pressed.push(num);
    } else {
      let cnt = 1;

      while (1) {
        let up = num + cnt;
        let down = num - cnt;
        if (down >= 0 && normalKey[down]) {
          pressed.push(down);
          break;
        } else if (up < 10 && normalKey[up]) {
          pressed.push(up);
          break;
        }
        cnt++;
      }
    }
  });

  return pressed.length + Math.abs(n - Number(pressed.join('')));
}

console.log(solution());
 */
