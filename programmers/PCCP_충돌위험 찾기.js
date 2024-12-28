// 이동하는 좌표마다 해당 좌표까지 도달하는 데 걸리는 시간을 기록과 위치정보 기록
function solution(points, routes) {
  let collisionCnt = 0; // 전체 충돌 횟수

  const record = new Map(); // 시간, 좌표, 충돌횟수 기록

  routes.forEach((route, index) => {
    let sec = 0;
    let [r, c] = points[route[0] - 1]; // 시작 포인트

    setRecord(r, c, sec);

    for (let i = 0; i < route.length; i++) {
      const point = route[i] - 1;
      const [nr, nc] = points[point]; // 다음 포인트의 r, c
      const step_r = nr > r ? 1 : -1; // 다음 포인트로 이동하기 위한 r 방향 (좌우)
      const step_c = nc > c ? 1 : -1; // 다음 포인트로 이동하기 위한 c 방향 (상하)

      while (r !== nr || c !== nc) {
        sec++;

        if (r !== nr) r += step_r;
        else c += step_c;

        setRecord(r, c, sec);
      }
    }
  });

  for (const count of record.values()) {
    if (count > 1) collisionCnt++;
  }

  function setRecord(row, col, sec) {
    const key = `${row} ${col}, ${sec}`;
    const value = record.get(key) || 0;
    record.set(key, value + 1);
  }

  return collisionCnt;
}
