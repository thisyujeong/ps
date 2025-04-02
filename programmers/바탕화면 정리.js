function solution(wallpaper) {
  const row = wallpaper.length;
  const col = wallpaper[0].length;
  const coords = [];

  // 파일이 있는 좌표 찾기
  for (let y = 0; y < row; y++) {
    for (let x = 0; x < col; x++) {
      if (wallpaper[y][x] === '#') {
        coords.push([y, x]);
      }
    }
  }

  // 파일이 있는 좌표 중 시작점은 최소 좌표 x1, y1, 끝점은 최대 좌표 x2, y2
  let dragger = [50, 50, 0, 0]; // [y1, x1, y2, x2]

  coords.forEach(([y, x]) => {
    dragger = [
      Math.min(dragger[0], y),
      Math.min(dragger[1], x),
      Math.max(dragger[2], y + 1),
      Math.max(dragger[3], x + 1),
    ];
  });

  return dragger;
}
