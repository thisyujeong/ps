/**
 * 백트래킹 문제
 * 문제를 이해하는 것부터 어려움이 있었음
 *
 * 치킨집의 갯수 중 M개를 골라 집과의 거리를 합산해 가장 작은 거리가 어느 치킨집인지 알야아 하는 문제다
 * 따라서 [치킨집 M개의 조합]과 [집]의 거리를 계산하여 가장 작은 값을 찾는 것
 *
 * 예를 들어, M = 2 이고, 다음과 같이 집의 좌표와 치킨집의 좌표가 있다고 가정해보자
 * house [ [ 0, 3 ], [ 1, 0 ], [ 1, 2 ], [ 3, 3 ], [ 3, 4 ], [ 4, 3 ] ]
 * chicken [ [ 0, 1 ], [ 3, 0 ], [ 4, 0 ], [ 4, 1 ], [ 4, 4 ] ]
 *
 * 치킨집을 M(2)개씩 조합하면 10개의 조합이 나온다
 * - [0, 1],[3, 0]
 * - [0, 1],[4, 0]
 * - [0, 1],[4, 1]
 * - [0, 1],[4, 4]
 * - [3, 0],[4, 0]
 * - [3, 0],[4, 1]
 * - ...
 *
 * 첫번째 치킨집 조합 [0, 1], [3, 0] 에 대하여 도시의 치킨 거리를 구한다면
 * 1. 집 [0, 3]과 치킨집 [0, 1]의 거리는 2
 * 2. 집 [0, 3]과 치킨집 [3, 0]의 거리는 6
 * 따라서 두 치킨집 중 더 가까운 거리를 골라 합산한다
 *
 * 이어서 집 [1, 0]과 첫번째 치킨집 조합을 살펴보면
 * 1. 집 [1, 0]과 치킨집 [0, 1]의 거리는 2
 * 2. 집 [1, 0]과 치킨집 [3, 0]의 거리는 2
 *
 * 이렇게 반복하여 최솟값을 갖는 누적 합(거리합)을 구하면 된다.
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const map = input.map((line) => line.split(' ').map(Number));
const houses = [];
const chickens = [];

// 집, 치킨집 좌표 찾기
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    const current = map[r][c];
    if (current === 1) houses.push([r, c]);
    if (current === 2) chickens.push([r, c]);
  }
}

const getMinDistance = (combination) => {
  let sum = 0;

  // house r, house c
  for (let [hr, hc] of houses) {
    let min = Infinity;
    // chicken r, chicken c
    for (let [cr, cc] of combination) {
      let distance = Math.abs(hr - cr) + Math.abs(hc - cc); // 두 좌표의 거리 계산하기
      min = Math.min(min, distance); // [집 - 치킨집 조합]의 거리들 중 가장 가까운 값을 구함
    }
    sum += min; // 가장 가까운 거리 누적 합
  }

  return sum;
};

const combination = []; // 치킨집의 조합 (계속 업데이트 됨)
let answer = Infinity;

const recursive = (depth, start) => {
  if (depth === M) {
    answer = Math.min(answer, getMinDistance(combination));
    return;
  }

  for (let i = start; i < chickens.length; i++) {
    combination[depth] = chickens[i];
    recursive(depth + 1, i + 1);
  }
};

recursive(0, 0);

console.log(answer);
