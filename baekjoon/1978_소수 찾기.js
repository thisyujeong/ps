const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const n = +input[0];
const nums = input[1].split(' ').map(Number);
let cnt = 0;

function checkIsPrime(num) {
  if (num === 1) return;

  /**
   * 1은 소수가 아니기 때문에 2부터 순환한다.
   * 주어진 수를 num이라고 가정할떄 num을 2부터 num - 1까지의 수로 나눈다.
   * 나누어 떨어진다면 num은 소수가 아니다.
   *
   * 그러나 2부터 num-1까지 순환할 필요 없이 num의 제곱근까지만 나누어도 소수의 여부를 확인할 수 있다.
   * 예를 들어 9가 주어지면 2부터, 9의 제곱근인 3까지만 나누어보아도 소수가 아닌 것을 알 수 있다.
   */
  for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
    if (num % i === 0) return;
  }

  return true;
}

for (let i = 0; i < n; i++) {
  if (checkIsPrime(nums[i])) cnt++;
}

console.log(cnt);
