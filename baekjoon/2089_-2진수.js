let input = +require('fs').readFileSync('./input.txt').toString().trim();
const answer = [];

// 주어진 수가 0일 경우 0출력
if (input === 0) {
  console.log(0);
} else {
  // 주어진 수를 더이상 -2로 나누어지지 않을 때까지 while 반복문 수행
  while (input / -2 !== 0) {
    // 주어진 수를 -2로 나눈 나머지
    let remainder = input % -2;

    /**
     * 나머지가 1 또는 -1이 아닐경우, 1 또는 -1로 표현될 수 있도록 주어진 수의 몫에 1을  더한다.
     * - 애초에 나누어지지 않을 경우 while 문 성립 안되기 때문에 나머지 값은 -1 ~ 1 범위 -> 주어진 수를 -2로 나눈 몫에 + 1
     * 예시) -2 * 7 = -14 -> 나머지 1 (6.5에서 소수점 제거 후 + 1)
     */
    if (remainder === 1 || remainder === -1) {
      input = Math.floor(input / -2) + 1;
      answer.push(1);
    } else if (remainder === 0) {
      input = Math.floor(input / -2);
      answer.push(0);
    }
  }
}

console.log(answer.length === 0 ? 0 : answer.reverse().join(''));
