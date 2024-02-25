/**
 * 1. 메모리 초과 방지를 위해 퍼즐을 문자열로 변환해서 푼다
 * 2. bfs 순회로 퍼즐을 돌리는 경우의 수를 순회한다.
 * TODO: 다시 풀이보기
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const puzzle = input.map((line) => line.split(' ').join('')).join('');
const goal = '123456780';

// 탐색 방향 좌표: 상하좌우
const move = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

// 빈 퍼즐과 특정 퍼즐을 교환한 보드
function swap(board, current, move) {
  const next = board.split(''); // 문자열을 배열로 변환하여 swap하기 위함
  next[current] = next[move]; // 타겟 퍼즐과 빈 퍼즐을 교환
  next[move] = '0'; // 무조건 빈 퍼즐
  return next.join(''); // 문자열로 반환
}

function dfs(data) {
  const visited = { [data]: 0 }; // 보드의 퍼즐 이동횟수 초기화
  const boards = [data];

  while (boards.length) {
    const board = boards.shift(); // 현재 보드
    const count = visited[board]; // 현재 보드의 이동횟수

    if (board === goal) return count; // 현재 보드와 목표 보드가 일치할 경우 종료

    const curIndex = board.indexOf('0'); // 빈 퍼즐이 있는 인덱스

    // 현재 퍼즐의 상하좌우 탐색
    for (const [y, x] of move) {
      const nextIndex = curIndex + y * 3 + x; // 교환할 퍼즐의 인덱스 (0 ~ 8)
      if (nextIndex < 0 || nextIndex >= 9) continue; // 다음 퍼즐 인덱스의 범위 체크

      const nextBoard = swap(board, curIndex, nextIndex); // 퍼즐을 이동한 결과

      // 탐색한 적 없는 보드일경우
      if (visited[nextBoard] === undefined) {
        boards.push(nextBoard); // 다음에 순회할 퍼즐 추가
        visited[nextBoard] = count + 1; // 교환 횟수 + 1
      }
    }
  }

  return -1;
}

console.log(dfs(puzzle));
