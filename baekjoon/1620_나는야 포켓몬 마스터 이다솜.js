/* 해시맵 응용 문제 */
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number); // N:도감에 수록된 포켓몬 수, M: 문제 개수
const pokemons = input.slice(0, N); // 도감에 수록된 포켓몬
const quiz = input.slice(N); // 맞춰야하는 문제
const dictionary = new Map();

for (let i = 0; i < N; i++) {
  dictionary.set(pokemons[i], i + 1);
}

let answer = '';
for (let k = 0; k < M; k++) {
  const q = quiz[k];
  let pokemon = dictionary.get(q);

  if (pokemon) answer += pokemon + '\n'; // 문제가 포켓몬 이름일 경우
  else answer += pokemons[Number(q) - 1] + '\n'; // 문제가 숫자일경우
}

console.log(answer);
