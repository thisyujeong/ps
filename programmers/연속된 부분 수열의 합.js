// 백트래킹? 슬라이딩 윈도우? - X
// -> 투포인트
// 알고리즘을 떠올리는 연습이 부족하다...
function solution(sequence, k) {
  let left = 0;
  let right = 0;
  let sum = sequence[0];
  let answer = [];

  while (right < sequence.length) {
    if (sum < k) {
      sum += sequence[++right];
    } else if (sum > k) {
      sum -= sequence[left++];
    } else {
      answer.push([left, right]);
      sum += sequence[++right];
    }
  }

  answer.sort((a, b) => {
    const diff = Math.abs(a[1] - a[0]) - Math.abs(b[1] - b[0]); // 길이 차이 비교
    if (diff === 0) return a[0] - b[0]; // 길이가 같으면 인덱스 기준 정렬
    return diff; // 길이가 짧은 순으로 정렬
  });

  return answer[0];
}
