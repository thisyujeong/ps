const input = require('fs')
  .readFileSync('./input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' ').map(Number));
const [N, M] = input.shift(); // N:사람의수, M:파티의수
const trueman = new Set(input.shift().slice(1)); // 진실을 알고있는 사람
const parties = input.map((v) => v.slice(1));

// 진실을 알고있는 사람이 없다면 파티 수 출력
if (trueman.size === 0) {
  console.log(parties.length);
  return;
}

// 그래프 구성
const graph = Array.from({ length: N + 1 }, () => []);
for (let party of parties) {
  for (let i = 0; i < party.length; i++) {
    for (let j = i + 1; j < party.length; j++) {
      if (!graph[party[i]].includes(party[j])) {
        graph[party[i]].push(party[j]);
      }
      if (!graph[party[j]].includes(party[i])) {
        graph[party[j]].push(party[i]);
      }
    }
  }
}

// 진실을 알고있는 사람이 포함된 파티의 멤버를 trueman 변수에 추가
for (let man of trueman) {
  for (let next of graph[man]) {
    if (!trueman.has(next)) {
      trueman.add(next);
    }
  }
}

// 각 파티를 탐색하고
// false: 각 파티의 멤버가 trueman에 포함된다면 과장된 이야기를 할 수 없음
// true: 각 파티의 멤버가 trueman에 포함되지 않는다면 과장된 이야기를 할 수 있음
const answer = parties.map((party) => {
  for (let man of party) {
    if (trueman.has(man)) return false;
    return true;
  }
});

// 과장된 이야기를 할 수 있는 파티(true) 수 출력
console.log(answer.filter((v) => v).length);
