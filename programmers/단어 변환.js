// 풀이 시간 40분
// 12:16 - 12:56
/*
 * bfs 문제
 * hit - hot - dot - dog - cog => ok!
 *           - lot - log => no!
 */

function solution(begin, target, words) {
  let answer = 0;
  const len = words.length;
  const visited = new Array(len).fill(false);

  for (let i = 0; i < len; i++) {
    if (isMatch(begin, words[i])) {
      answer = bfs(words[i], i);
      break;
    }
  }

  return answer;

  function bfs(start, index) {
    const queue = [[start, 1]]; // word, count
    let head = 0;

    visited[index] = true;

    while (head < queue.length) {
      const [cur, count] = queue[head++];

      if (target === cur) return count;

      for (let i = 0; i < len; i++) {
        const next = words[i];
        if (!visited[i] && isMatch(cur, next)) {
          queue.push([next, count + 1]);
          visited[i] = true;
        }
      }
    }

    return 0;
  }

  function isMatch(cur, next) {
    let diffCnt = 0;
    for (let i = 0; i < cur.length; i++) {
      if (diffCnt > 1) return false;
      if (cur[i] !== next[i]) diffCnt++;
    }
    return diffCnt === 1;
  }
}
