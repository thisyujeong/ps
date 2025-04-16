/*
입력: 길이 1이상 200이하의 문자열 s
    s는 알파벳, 숫자, 공백문자로 구성
        1. 숫자는 단어의 첫 문자로만 나옴
        2. 숫자로만 이루어진 단어는 없음.
        3. 공백 문자가 연속해서 나올 수 없음.

로직: 1. 공백을 기준으로 단어단위로 쪼갠다
    2. 분리된 단어만큼 loop 
        1. 단어의 첫 글자가 숫자가 아니라면? 대문자로 변환
            -> javascript 문자열 내장함수 toUpperCase는 숫자면 그대로 유지
            -> 별도로 처리할 필요없음
        2. 그 외 나머지 문자는 소문자로 변환 
    3. 분리된 단어들 공백으로 join
    
출력: JadenCase로 바꾼 문자열 반환
*/
function solution(s) {
  const strArr = s.split(' ').map((str) => {
    return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
  });

  return strArr.join(' ');
}
