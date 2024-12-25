// level 1
function solution(video_len, pos, op_start, op_end, commands) {
  var answer = '';

  const length_time = toMinutes(video_len.split(':').map(Number));
  const ops_time = toMinutes(op_start.split(':').map(Number));
  const ope_time = toMinutes(op_end.split(':').map(Number));
  let pos_time = toMinutes(pos.split(':').map(Number));

  let needJump = isOpening(pos_time, ops_time, ope_time);

  if (needJump) pos_time = ope_time;

  for (let cmd of commands) {
    pos_time = operator(cmd, pos_time, ops_time, ope_time, length_time);
  }

  const hour = String(Math.floor(pos_time / 60)).padStart(2, '0');
  const minutes = String(pos_time % 60).padStart(2, '0');

  answer = `${hour}:${minutes}`;
  return answer;
}

function toMinutes(times) {
  const [hour, minutes] = times;
  return hour * 60 + minutes;
}
function isOpening(time, op_start, op_end) {
  if (op_start > time || op_end <= time) return false;
  return true;
}
function operator(command, pos, op_start, op_end, len) {
  let time = pos;
  if (command === 'prev') time -= 10;
  if (command === 'next') time += 10;

  if (time < 0) time = 0;
  if (time > len) time = len;

  let needJump = isOpening(time, op_start, op_end);
  if (needJump) time = op_end;

  return time;
}
