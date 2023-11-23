/** 첫번째 시도(메모리 초과)
 * 메모리 초과 이유?
 *
 * 케이스 별로 홀수 소수를 찾는 과정을 모두 거쳐간 것이 문제였다.
 * -> 케이스가 몇개든 홀수 소수를 찾는 과정은 무조건 한 번만 거친다.
 * -> 즉, 주어진 케이스 중 가장 큰 값까지의 홀수 소수를 찾고 배열에 저장 true/false로 저장
 * -> 모든 케이스가 홀수 소수 여부를 저장한 배열을 활용함.
 */
/* const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const nums = input.map(Number);

function getOddPrime(num) {
  let primes = []; // 홀수 소수쌍 합이 num인 케이스
  let isPrime = Array(num + 1).fill(true);
  isPrime[0] = isPrime[1] = false; // 0, 1은 소수가 아님

  // 홀수만 검사 반복문
  for (let j = 3; j <= num; j += 2) {
    let time = 2; // j의 배수를 구하기 위해 곱할 값
    if (isPrime[j]) {
      // j의 배수는 약수가 아니므로 false 처리, j의 값은 변하지 않음
      while (j * time <= num) {
        isPrime[j * time] = false;
        time++;
      }
    }
  }

  // 모든 수를 비교할 필요 없이 절반 범위에서 홀수만 검사
  // num이 17일 경우, 3 + 17, 17 + 3 처럼 a, b 위치만 바뀐 값이 나올 수 있음
  // 문제에서 n을 만들 수 있는 방법이 여러개라면 b - a가 가장 큰 것을 출력한다고 했음
  // 즉 절반 범위만 검사하야 작은 값이 a가 되고 큰 값이 b가 되도록 함
  for (let j = 3; j <= Math.floor(num / 2); j += 2) {
    if (isPrime[num - j]) primes.push([j, num - j]);
  }

  return primes;
}

for (let i = 0; i < nums.length; i++) {
  if (nums[i]) {
    const primes = getOddPrime(nums[i]);

    if (primes.length === 0) {
      // 두 홀수 소수의 합으로 표현할 수 없는 경우
      console.log("Goldbach's conjecture is wrong.");
    } else {
      // 두 홀수 소수의 합으로 표현할 수 있는 경우
      const [a, b] = primes.sort((prime) => prime[1] - prime[0])[0]; // b - a의 값이 가장 큰 쌍
      console.log(`${nums[i]} = ${a} + ${b}`);
    }
  }
}
 */

/**
 * 두번쨰 시도(성공)
 * 케이스가 몇개든 홀수 소수를 찾는 과정은 무조건 한 번만 거친다.
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const nums = input.map(Number);
const max = Math.max(...nums);
const isPrime = new Array(max + 1).fill(true);
isPrime[0] = isPrime[1] = false; // 0과 1은 소수가 아님

// 주어진 케이스의 가장 큰 값까지의 홀수인 소수를 찾음
// 홀수이자 소수일 경우 해당 배열의 인덱스는 true, 아닐경우 false
// 제곱근까지만 나누어도 소수의 여부를 확인할 수 있으므로 i * i 가 max 미만인 범위 내에서 반복문 실행
// ex. 9가 주어지면 2부터, 9의 제곱근인 3까지만 나누어보아도 소수가 아닌 것을 알 수 있음
for (let i = 2; i * i < max; i++) {
  if (isPrime[i]) {
    // j의 배수를 구하기 위해 곱할 값
    let time = 2;

    // j의 배수는 약수가 아니므로 false 처리
    while (i * time < max) {
      isPrime[i * time] = false;
      time++;
    }
  }
}

let result = '';
nums.map((num) => {
  if (num === 0) return;

  // 홀수인 소수 한 쌍의 합이 num인 쌍을 찾았을 경우 true, 찾지 못할 경우 false
  let found = false;

  // 2는 소수가 아니므로 3부터 반복문 수행
  for (let i = 3; i < num; i++) {
    // 합이 num이 되는 두 수를 구하는 방법
    // i와 매칭되는 다른 한 수를 구할 경우 num - i을 하면 됨 (단, 두 수는 홀수여야 하므로 분기처리)
    if (isPrime[i] && isPrime[num - i]) {
      result += `${num} = ${i} + ${num - i}\n`;
      found = true;

      // 가장 먼저 탐색되는 두 수는 차이가 가장 클 수밖에 없기 때문에 더이상 탐색할 필요가 없음
      break;
    }
  }

  if (!found) result += "Goldbach's conjecture is wrong.";
});

console.log(result);
