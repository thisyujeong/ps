function solution(new_id) {
  // 1. 소문자 치환
  let str = new_id.toLowerCase();

  // 2. 문알파벳 소문자, 숫자, 빼기, 밑줄, 마침표 제외한 모든 문자 제거
  const reg = /[~!@#$%^&*()=+\[\{\]\}:?,<>\\\/]/g;
  str = str.replace(reg, '');

  // 3. new_id에서 마침표가 두번이상 연속된 부분을 하나의 마침표로 치환
  str = str.replace(/\.{2,}/g, '.');

  // 4. 처음, 마지막 문자가 마침표라면 제거
  if (str.slice(0, 1) === '.') {
    str = str.slice(1);
  }
  if (str.slice(str.length - 1) === '.') {
    str = str.slice(0, str.length - 1);
  }

  // 5. 빈 문자열이라면, new_id에 "a" 대입
  if (str === '') str = 'a';

  // 6. 16자 이상이면 15개의 문자 제외하고 모두 제거
  if (str.length > 15) {
    str = str.slice(0, 15);
    // 6-1. 제거 후 마침표가 new_id의 끝에 위치한다면 끝에 위치한 마침표 제거
    if (str.slice(str.length - 1) === '.') {
      str = str.slice(0, str.length - 1);
    }
  }

  // 7. 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 이어붙
  if (str.length <= 2) {
    str += str[str.length - 1].repeat(3 - str.length);
  }

  return str;
}

/* 간단한 풀이 비교 */
function solution(new_id) {
  const answer = new_id
    .toLowerCase() // 1
    .replace(/[^\w-_.]/g, '') // 2
    .replace(/\.+/g, '.') // 3
    .replace(/^\.|\.$/g, '') // 4
    .replace(/^$/, 'a') // 5
    .slice(0, 15)
    .replace(/\.$/, ''); // 6
  const len = answer.length;
  return len > 2 ? answer : answer + answer.charAt(len - 1).repeat(3 - len);
}
