function solution(bandage, health, attacks) {
  const [t, x, y] = bandage; // 기술시간, 초당 회복량, 추가 회복량

  let stamina = health; // 체력
  let cur_time = 0; // 경과 시간
  let attack_cnt = 0; // 공격 횟수
  let combo_cnt = 0; // 연속 성공 횟수
  let skill_end = 0; // 스킬 종료되는 시간

  while (attack_cnt < attacks.length) {
    const [attack_t, damage] = attacks[attack_cnt];

    cur_time++;

    // 공격
    if (cur_time === attack_t) {
      // 기술 사용중 - 스킬 중단
      if (cur_time < skill_end) skill_end = cur_time;

      attack_cnt++;
      stamina = stamina - damage;
      combo_cnt = 0;
    }
    // 기술 사용
    else {
      skill_end = cur_time + t; // 스킬 끝나는 시간
      stamina = stamina + x;
      combo_cnt += 1;

      if (combo_cnt === t) {
        // 콤보 성공
        stamina = stamina + y;
        combo_cnt = 0;
      }
    }

    if (stamina <= 0) return -1; // 체력이 0이 되면 종료
    if (stamina > health) stamina = health; // 체력이 최대치를 초과하면 최대 체력으로 변경
  }

  return stamina;
}

/* 다른 사람 풀이 */
function solution(bandage, health, attacks) {
  let currHealth = health;
  let currTime = 0;

  for (let [attackTime, damage] of attacks) {
    let diffTime = attackTime - currTime - 1; // 현재와 공격의 시간차
    currHealth += diffTime * bandage[1] + Math.floor(diffTime / bandage[0]) * bandage[2];
    // currHealth += (diffTime * bandage[1]) + Math.floor(diffTime / bandage[0]) * bandage[2];
    // currHealth += (공격시간의 시간차 * 회복량) + ((공격시간의 시간차 / 기술시간) * 추가회복량)

    if (currHealth > health) currHealth = health; // 최대 체력 초과시
    currHealth -= damage; // 공격받은 후 체력 감소
    if (currHealth <= 0) return -1; // 체력이 0 이하인 경우 종료(죽음)
    currTime = attackTime; // 현재 시간 공격시간으로 재할당 (공격 받는 즉시 기술 종료)
  }

  return currHealth;
}
