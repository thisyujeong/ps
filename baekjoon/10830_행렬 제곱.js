/**
 * 행렬의 기본개념을 알아야 함
 * - 행렬의 곱셈 https://mathbang.net/562#gsc.tab=0
 * - 행렬의 빠른 거듭제곱
 *
 * 1. 브루트포스 방법 (시간초과)
 * A 행렬을 B번 곱한다 -> B의 최댓값이 1000억 -> 시간초과 발생할 것 = 시간복잡도 O(n^3)
 *
 * 2. 빠른 거듭제곱 방법 (분할정복)
 * 효율적인 계산을 위해 거듭제곱을 분할정복하는 방법
 * 숫자의 거듭제곱 계산 방식과 유사하다 시간 복잡도를 O(n3 * log k)로 줄인다
 *
 * - k = 0 일때, A^k = I(항등 행렬: 대각성분만 I, 나머지는 0인 행렬)
 * - k가 짝수일 때: A^k = A^{k/2} * A^{k/2}
 * - k가 홀수일 때: A^k = A * A^{k-1}
 *
 * 예시(k = 5)
 * - A^5 = A * A^4
 * - A^4 = A^2 * A^2
 * - A^2 = A * A
 * 3번의 연산으로 행렬의 거듭제곱을 구함
 *
 * 즉, 일반적인 반복 곱셈으로 A^k를 계산하면 k번의 곱셈이 필요하여 시간 복잡도가 O(n^3 * k), 여기서 n^3은 n x n 행렬 곱셉의 복잡도
 * 빠른 거듭제곱은 k를 이진수로 표현했을 때의 비트 수만큼만 곱셈을 수행하므로 시간 복잡도가 O(n^3 * log k)로 대폭 줄어든다
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, b] = input.shift().split(' ').map(Number);
const A = input.map((line) => line.split(' ').map(Number));

function matrix_multiply(A, B) {
  const matrix = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        matrix[i][j] += (A[i][k] * B[k][j]) % 1000;
      }
      matrix[i][j] = matrix[i][j] % 1000;
    }
  }
  return matrix;
}

function matrix_power(A, k) {
  let base = A;

  // 항등행렬(I) 초기화
  // 항등행렬이 필요한 이유? 행렬 거듭제곱의 시작점을 올바르게 초기화하기 위함.
  // 항등행렬은 행렬 곱셈에서 곱셈의 항등원 역할을 하므로, 행렬 거듭제곱의 기반을 제공
  // : 초기상태에서 A^0 = I 로 설정하여, 재귀적으로 A^k를 계산하는 역할
  let result = Array.from({ length: n }, (_, y) =>
    Array.from({ length: n }, (_, x) => (x === y ? 1 : 0))
  );

  while (k > 0) {
    // 지수(k)가 홀수인 경우
    if (k % 2 === 1) {
      // 현재 결과 행렬 result에 base 행렬을 곱한다 (result = 누적곱셈)
      result = matrix_multiply(result, base);
    }
    base = matrix_multiply(base, base); // (제곱) 지수 k를 절반으로 줄일 때, 다음 단계의 계산을 미리 준비
    k = Math.floor(k / 2); // 지수를 절반으로 줄임 (0이되면 종료)
  }
  return result;
}

const answer = matrix_power(A, b);
answer.map((row) => console.log(row.join(' ')));
