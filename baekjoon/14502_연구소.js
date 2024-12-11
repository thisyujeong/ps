/**
 * 최대 64개의 공간, 바이러스 최소 2개
 * 빈 공간은 최대 62개
 *
 * 62 C 3 -> 62개중 3개를 뽑는 '조합'의 문제 -> 백트래킹
 * : 62 x 61 x 60 복잡도의 문제
 * : 대략 2^6 x 2^6 x 2^6 = 2^18
 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [n, m] = input.shift().split(' ').map(Number); // n: 세로, m: 가로 (3 <= n, m <= 8)
const map = input.map((l) => l.split(' ').map(Number));
const temp = [...new Array(n)].map(() => new Array(m).fill(0));
const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const selected = [];
let answer = 0;

// dfs
const dfs = (row, col) => {
  temp[row][col] = 2; // 바이러스
  for (let [dx, dy] of dir) {
    const [nx, ny] = [dx + col, dy + row];
    if (nx < 0 || ny < 0 || nx >= m || ny >= n) continue;
    if (temp[ny][nx] !== 0) continue;
    dfs(ny, nx);
  }
};

// 바이러스 체크
const viruesCheck = () => {
  // map 복제
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      temp[i][j] = map[i][j];
    }
  }
  // 선택된 3개의 조합(벽))
  for (let i = 0; i < 3; i++) {
    const index = selected[i];
    const row = Math.floor(index / m);
    const col = index % m;
    temp[row][col] = 1;
  }

  // 바이러스 퍼트리기
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (temp[i][j] !== 2) continue;
      dfs(i, j);
    }
  }

  // 감염되지 않은 연구소 개수 구하기
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (temp[i][j] !== 0) continue;
      count++;
    }
  }

  if (answer < count) answer = count;
};

// 조합 백트래킹
const combination = (index) => {
  // 벽 3 개 조합 -> dfs 실행하여 바이러스 퍼트림
  if (selected.length === 3) {
    viruesCheck();
    return;
  }

  for (let i = index; i < n * m; i++) {
    const row = Math.floor(i / m);
    const col = i % m;

    if (map[row][col] !== 0) continue; // 빈칸(연구소)이 아니면
    selected.push(i);
    combination(i + 1);
    selected.pop();
  }
};

combination(0);
console.log(answer);

// bfs는 실행할때마다 temp 배열을 새로 만들기때문에 위 방식에 비해
// 실행시간이 길어지고 메모리도 많이 차지한다.
/* let answer = 0;
function bfs() {
  const queue = [];
  const temp = map.map((line) => [...line]); // copy

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (temp[y][x] === 2) queue.push([x, y]); // 바이러스
    }
  }

  while (queue.length) {
    const [x, y] = queue.shift();
    for (let [dx, dy] of dir) {
      const [nx, ny] = [x + dx, y + dy];
      if (nx >= 0 && ny >= 0 && nx < m && ny < n) {
        if (temp[ny][nx] === 0) {
          temp[ny][nx] = 2;
          queue.push([nx, ny]);
        }
      }
    }
  }

  let count = 0; // 감염되지 않은 연구소 개수(빈칸)
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (temp[y][x] === 0) count++;
    }
  }
  answer = Math.max(answer, count);
}

// 백트래킹
function setWall(count) {
  if (count === 3) {
    bfs();
    return;
  }

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      // 빈공간이라면 벽 세우기 가능
      if (map[y][x] === 0) {
        map[y][x] = 1;
        setWall(count + 1);
        map[y][x] = 0;
      }
    }
  }
}

setWall(0);
console.log(answer);
 */
