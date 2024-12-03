/**
 * 보드 사이즈만큼 방문 여부를 체크하는 visited 배열을 활용해 DFS 깊이우선 탐색을 시도했으나 - 실패
 *
 * 역으로 생각해보자
 * visited 배열의 크기를 알파벳 개수(26)만큼 메모리를 할당
 * 알파벳을 아스키 코드로 변환하면 대문자 A부터 65, 66,. .. 으로 이루어진다
 * 입력받은 보드 판의 알파벳을 숫자로 변환하고 65를 빼면 0 ~ 26까지 표현할 수 있고 visited의 인덱스를 찾을 수 있음
 *
 */

const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [R, C] = input.shift().split(' ').map(Number);
const board = input.map((l) => l.split('').map((b) => b.charCodeAt() - 65));
const visited = new Array(26).fill(false);

const dy = [1, -1, 0, 0],
  dx = [0, 0, -1, 1];

let answer = 0;
function dfs(r, c, cnt) {
  answer = Math.max(answer, cnt);
  for (let i = 0; i < 4; i++) {
    const [nr, nc] = [r + dy[i], c + dx[i]];
    if (nr >= 0 && nc >= 0 && nr < R && nc < C) {
      if (!visited[board[nr][nc]]) {
        visited[board[nr][nc]] = true;
        dfs(nr, nc, cnt + 1);
        visited[board[nr][nc]] = false;
      }
    }
  }
}

visited[board[0][0]] = true;
dfs(0, 0, 1);

console.log(answer);
