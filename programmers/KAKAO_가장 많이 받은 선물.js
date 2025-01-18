/* 2024 KAKAO WINTER INTERNSHIP */
// 걸린 시간: 1:07
function solution(friends, gifts) {
  // 1. 2차원 테이블 구성 (row: 준 사람, col: 받은 사람)
  // 2. 선물 지수 계산

  const len = friends.length;
  const gift_table = Array.from({ length: len }, () => new Array(len).fill(0));
  const gift_power = Array.from({ length: len }).fill(0); // 선물 지수
  const next_receiver = Array.from({ length: len }).fill(0);
  const index_map = new Map();

  // 인덱스 해시맵 구성
  for (let i = 0; i < len; i++) {
    index_map.set(friends[i], i);
  }

  // 주고받은 기록 테이블 구성
  for (let i = 0; i < gifts.length; i++) {
    const [giver, receiver] = gifts[i].split(' ');
    const giver_idx = index_map.get(giver);
    const receiver_idx = index_map.get(receiver);
    gift_table[giver_idx][receiver_idx] += 1;
  }

  // 선물 지수 계산
  for (let i = 0; i < len; i++) {
    const gift_cnt = gift_table[i].reduce((a, b) => a + b, 0);
    const receiver_cnt = gift_table.map((row) => row[i]).reduce((a, b) => a + b, 0);
    gift_power[i] = gift_cnt - receiver_cnt;
  }

  // 다음에 선물 받는 횟수
  // 1. 선물 준 횟수가 더 큰 사람이 받는다
  // 2. 선물 준 횟수가 같으면
  //    2.1 선물 지수가 더 큰 사람이 받는다.
  //    2.2 선물 지수가 같으면 아무도 받지 않음
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (gift_table[i][j] < gift_table[j][i]) next_receiver[j]++;
      if (gift_table[i][j] > gift_table[j][i]) next_receiver[i]++;
      if (gift_table[i][j] === gift_table[j][i]) {
        if (gift_power[i] < gift_power[j]) next_receiver[j]++;
        if (gift_power[i] > gift_power[j]) next_receiver[i]++;
      }
    }
  }

  return Math.max(...next_receiver);
}
