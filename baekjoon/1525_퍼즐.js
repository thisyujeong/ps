/**
 * 1. 메모리 초과 방지를 위해 퍼즐을 문자열로 변환해서 푼다
 * 2. bfs 순회로 퍼즐을 돌리는 경우의 수를 순회한다.
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const puzzle = input.map((line) => line.split(' ').join('')).join('');
const goal = '123456780';

// 탐색 방향 좌표: 상하좌우
const move = [-1, 1, 3, -3];
// 빈 퍼즐과 특정 퍼즐을 교환한 보드
function swap(board, current, move) {
  const next = board.split(''); // 문자열을 배열로 변환하여 swap하기 위함
  next[current] = next[move]; // 타겟 퍼즐과 빈 퍼즐을 교환
  next[move] = '0'; // 무조건 빈 퍼즐
  return next.join(''); // 문자열로 반환
}

function bfs(data) {
  const visited = { [data]: 0 }; // 각 보드의 퍼즐 이동횟수 초기화
  const boards = [data];
  let head = 0;

  while (boards.length > head) {
    const board = boards[head++]; // 현재 보드
    const count = visited[board]; // 현재 보드의 이동횟수

    if (board === goal) return count; // 현재 보드와 목표 보드가 일치할 경우 종료

    const curIndex = board.indexOf('0'); // 빈 퍼즐이 있는 인덱스

    // 현재 퍼즐의 상하좌우 탐색
    for (const dir of move) {
      const nextIndex = curIndex + dir; // 교환할 퍼즐의 인덱스 (0 ~ 8)

      // 1. 다음 퍼즐 인덱스의 범위 체크
      // 2. 3번째 칸과 4번째칸, 6번째 칸과 7번째 칸은 교환할 수 없음
      if (
        nextIndex < 0 ||
        nextIndex >= 9 ||
        (dir === 1 && nextIndex % 3 === 0) ||
        (dir === -1 && nextIndex % 3 === 2)
      ) {
        continue;
      }

      const nextBoard = swap(board, curIndex, nextIndex); // 퍼즐을 이동한 결과
      if (visited[nextBoard]) continue; // 탐색한 적 있는 보드일경우

      boards.push(nextBoard); // 다음에 순회할 퍼즐 추가
      visited[nextBoard] = count + 1; // 교환 횟수 + 1
    }
  }

  return -1;
}

console.log(bfs(puzzle));
