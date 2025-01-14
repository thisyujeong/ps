function solution(picks, minerals) {
  let answer = 0;
  let cutCount = Math.ceil(minerals.length / 5);

  let pickTotal = picks.reduce((a, b) => a + b); // 곡괭이 총 개수
  if (pickTotal === 0) return 0;

  // 곡괭이를 최대로 사용하고 남는 광물 버리기
  minerals = minerals.splice(0, pickTotal * 5);

  let damage = []; // 피로도
  // 광물 배열을 5개씩 끊어서 탐색
  for (let i = 0; i < cutCount; i++) {
    // 구간 내에 속한 광물 개수
    let acc = { diamond: 0, iron: 0, stone: 0 };
    minerals.splice(0, 5).map((mineral) => {
      acc[mineral]++;
    });

    // 각 곡괭이 사용에 따른 피로도
    damage.push([
      acc.diamond + acc.iron + acc.stone, // 다이아 곡괭이 사용시 피로도
      acc.diamond * 5 + acc.iron + acc.stone, // 철 곡괭이 사용시 피로도
      acc.diamond * 25 + acc.iron * 5 + acc.stone, // 돌 곡괭이 사용시 피로도
    ]);
  }

  // 돌 곡괭이 기준으로 오름차순 정렬
  // 피로도가 가장 적게 소모되는 순
  damage = damage.sort((a, b) => b[2] - a[2]);

  for (let i = 0; i < picks.length; i++) {
    let pickCount = picks[i];

    while (pickCount--) {
      if (damage.length === 0) return answer;
      answer += damage.shift()[i];
    }
  }

  return answer;
}
