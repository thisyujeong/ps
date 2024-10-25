const input = require('fs').readFileSync('./input.txt').toString().split(' ');
let [up, down, height] = input.map((v) => +v);

/**
 * 정상에 도착하면 미끄러지지 않고 즉시 끝나므로 height - down 만 올라가면 된다.
 * 낮에 올라가고, 밤에 미끄러지니 하루에 올라갈 수 있는 높이는 up - down
 * 즉 (올라가야하는 총 높이 / 하루에 올라갈 수 있는 높이) 식으로 나누고 반올림
 */
console.log(Math.ceil((height - down) / (up - down)));
