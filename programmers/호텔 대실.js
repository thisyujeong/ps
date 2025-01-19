function solution(book_time) {
  const answer = [];

  book_time = book_time
    .map(([start, end]) => [timeToMinutes(start), timeToMinutes(end)])
    .sort((a, b) => a[0] - b[0]);

  book_time.forEach((time) => {
    const [start, end] = time;

    // 한 번도 입실한 적 없다면 바로 입실 처리
    if (!answer.length) {
      answer.push(end + 10); // 퇴실 시간 + 청소 시간
      return;
    }

    let isChange = false; // 같은 룸에서 퇴실 후 입실이 이루어졌는지 체크
    for (let i = 0; i < answer.length; i++) {
      if (answer[i] <= start) {
        answer[i] = end + 10; // 퇴실시간 + 청소 시간
        isChange = true; // 같은 룸에서 퇴실 후 입실이 이루어졌으므로 true
        break;
      }
    }

    // 같은 룸에서 퇴실과 입실이 이루어지지 않았다면 새로운 룸 추가
    if (!isChange) answer.push(end + 10);
  });

  return answer.length;
}

function timeToMinutes(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/* 다른 사람 풀이 */
// 분단위로 체크하는 timeArr를 구성하여 겹치는 타임테이블이 있으면
// 그 timeArr[분] +1을 해줌으로써 같은 시간에 몇 개의 룸이 있는지 체크할 수 있음
function makeMinStamp(time) {
  const [hour, min] = time.split(':').map((v) => Number(v));
  return hour * 60 + min;
}

function solution(book_time) {
  const timeArr = Array.from({ length: makeMinStamp('23:59') + 10 }, () => 0);

  book_time.forEach((time, i) => {
    const [s, e] = time;
    let start = makeMinStamp(s);
    const end = makeMinStamp(e) + 9;

    for (start; start <= end; start++) {
      timeArr[start]++;
    }
  });

  return Math.max(...timeArr);
}
