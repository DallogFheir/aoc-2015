const SHOP = {
  weapons: [
    { name: "Dagger", cost: 8, damage: 4, armor: 0 },
    { name: "Shortsword", cost: 10, damage: 5, armor: 0 },
    { name: "Warhammer", cost: 25, damage: 6, armor: 0 },
    { name: "Longsword", cost: 40, damage: 7, armor: 0 },
    { name: "Greataxe", cost: 74, damage: 8, armor: 0 },
  ],
  armor: [
    { name: "-", cost: 0, damage: 0, armor: 0 },
    { name: "Leather", cost: 13, damage: 0, armor: 1 },
    { name: "Chainmail", cost: 31, damage: 0, armor: 2 },
    { name: "Splintmail", cost: 53, damage: 0, armor: 3 },
    { name: "Bandedmail", cost: 75, damage: 0, armor: 4 },
    { name: "Platemail", cost: 102, damage: 0, armor: 5 },
  ],
  rings: [
    { name: "-", cost: 0, damage: 0, armor: 0 },
    { name: "-", cost: 0, damage: 0, armor: 0 },
    { name: "Defense +1", cost: 20, damage: 0, armor: 1 },
    { name: "Damage +1", cost: 25, damage: 1, armor: 0 },
    { name: "Defense +2", cost: 40, damage: 0, armor: 2 },
    { name: "Damage +2", cost: 50, damage: 2, armor: 0 },
    { name: "Defense +3", cost: 80, damage: 0, armor: 3 },
    { name: "Damage +3", cost: 100, damage: 3, armor: 0 },
  ],
};

const simulateGame = (playerInput, bossInput) => {
  const player = { ...playerInput };
  const boss = { ...bossInput };

  let attacker = player;
  let defender = boss;
  while (true) {
    let dmgDealt = attacker.dmg - defender.armor;
    dmgDealt = dmgDealt <= 0 ? 1 : dmgDealt;

    defender.hp -= dmgDealt;

    if (defender.hp <= 0) {
      return attacker;
    }

    defender = defender === player ? boss : player;
    attacker = attacker === player ? boss : player;
  }
};

//////

const part1 = (boss) => {
  let minCost = Infinity;

  for (const weapon of SHOP.weapons) {
    for (const armor of SHOP.armor) {
      for (let i = 0; i < SHOP.rings.length; i++) {
        for (let j = i + 1; j < SHOP.rings.length; j++) {
          const ring1 = SHOP.rings[i];
          const ring2 = SHOP.rings[j];

          const cost = weapon.cost + armor.cost + ring1.cost + ring2.cost;

          if (cost < minCost) {
            const dmg = weapon.damage + ring1.damage + ring2.damage;
            const arm = armor.armor + ring1.armor + ring2.armor;

            const winner = simulateGame(
              {
                name: "player",
                hp: 100,
                dmg,
                armor: arm,
              },
              boss
            );

            if (winner.name === "player") {
              minCost = cost;
            }
          }
        }
      }
    }
  }

  return minCost;
};

const part2 = (boss) => {
  let maxCost = -Infinity;

  for (const weapon of SHOP.weapons) {
    for (const armor of SHOP.armor) {
      for (let i = 0; i < SHOP.rings.length; i++) {
        for (let j = i + 1; j < SHOP.rings.length; j++) {
          const ring1 = SHOP.rings[i];
          const ring2 = SHOP.rings[j];

          const cost = weapon.cost + armor.cost + ring1.cost + ring2.cost;

          if (cost > maxCost) {
            const dmg = weapon.damage + ring1.damage + ring2.damage;
            const arm = armor.armor + ring1.armor + ring2.armor;

            const winner = simulateGame(
              {
                name: "player",
                hp: 100,
                dmg,
                armor: arm,
              },
              boss
            );

            if (winner.name === "boss") {
              maxCost = cost;
            }
          }
        }
      }
    }
  }

  return maxCost;
};

//////

const input = {
  name: "boss",
  hp: 100,
  dmg: 8,
  armor: 2,
};

console.log(`Part 1: ${part1(input)}`);
console.log(`Part 2: ${part2(input)}`);
