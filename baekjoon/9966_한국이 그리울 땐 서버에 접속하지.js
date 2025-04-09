/**
 * 입력: 패턴은 알파벳 소문자 여러개와 별표(*) 하나로 이루어진 문자열
 *     패턴과 파일 이름이 모두 주어졌을 때, 각각의 파일 이름이 패턴과 일치하는지 아닌지를 구하기
 *     abcd, ad, anestonestod 는 패턴 "a*d"와 일치, "bcd"는 불일치
 *
 *     첫째줄 파일의 개수 N
 *     둘째줄 패턴 - 알파벳 소문자와 별표 한개의 조합(아스키값 42),
 *     N개의 줄에 파일 이름이 주어진다 (영문 소문자)
 *     패턴과 파일 이름은 문자열 길이 100 이하
 *
 * 로직: 1. 정규식 풀이
 *      2. 문자열
 *
 * 출력: i번째 파일 이름이 패턴과 일치하면 DA, 일치하지 않으면 NE 출력
 */

const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const n = +input.shift();
const pattern = input.shift();

// 정규식 풀이
const solve1 = (pattern) => {
  /**
   * 정규식에서 .(닷): 임의의 단일 문자를 의미
   * 정규식에서 *(애스터리스크): 앞의 요소가 0회 이상 반복됨을 의미
   * -> 정규식에서 "임의의 문자열"을 표현하는 방법은 (.*)
   * -> .은 임의의 문자, *는 그 문자가 0회 이상 반복됨을 의미하고 전체적으로 "0개 이상의 임의의 문자"에 해당
   *
   * regexString = 기존 패턴 내의 *를 정규식으로 활용하기 위해 .*로 변환하는하는 과정
   *    -> \* 는 별표 문자를 의미, g 플래그는 'global 치환을 의미하고, 패턴 내 등장하는 모든 별표를 대상으로 함
   *    -> 문자열 전체가 패턴과 일치해야 한다면, 시작과 끝을 표시하는 (^, $) 앵커를 추가
   *    -> (^문자열) 특정 문자열로 시작, (문자열$) 특정 문자열로 끝남
   */
  const regexString = '^' + pattern.replace(/\*/g, '.*') + '$';
  const regex = new RegExp(regexString);

  input.forEach((file) => {
    const match = regex.test(file);

    if (!match) console.log('NE');
    else console.log('DA');
  });
};

// 문자열 풀이
const solve2 = (pattern) => {
  let result = '';
  pattern = pattern.split('*');

  for (const str of input) {
    const front = str.substring(0, pattern[0].length);
    const back = str.substring(str.length - pattern[1].length);

    // 패턴의 길이보다 주어진 문자열의 길이가 짧은 경우 일치할 수 없음
    if (str.length < pattern[0].length + pattern[1].length) result += 'NE\n';
    // 별표의 앞쪽 패턴과, 뒤쪽 패턴이 모두 같다면 일치
    else if (front === pattern[0] && back === pattern[1]) result += 'DA\n';
    // 그 외의 모든 케이스는 불일치
    else result += 'NE\n';
  }

  console.log(result);
};

solve1(pattern); // 정규식
solve2(pattern); // 문자열
