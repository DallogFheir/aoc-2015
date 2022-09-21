import PriorityQueue from "priorityqueuejs";

//////

const performEffects = (effects, player, boss) => {
  const newEffects = [];

  for (const effect of effects) {
    const newEffect = { ...effect };
    newEffect.timer -= 1;

    switch (effect.name) {
      case "Shield":
        player.armor = 7;
        break;
      case "Poison":
        boss.hp -= 3;
        break;
      case "Recharge":
        player.mana += 101;
        break;
      default:
        throw new Error(`Invalid effect: ${effect.name}.`);
    }

    if (newEffect.timer > 0) {
      newEffects.push(newEffect);
    } else if (effect.name === "Shield") {
      player.armor = 0;
    }
  }

  return newEffects;
};

//////

const part1 = (bossInput) => {
  const spells = {
    "Magic Missile": 53,
    Drain: 73,
    Shield: 113,
    Poison: 173,
    Recharge: 229,
  };

  const pq = new PriorityQueue((a, b) => b.manaSpent - a.manaSpent);

  for (const [name, cost] of Object.entries(spells)) {
    pq.enq({
      player: {
        hp: 50,
        mana: 500 - cost,
        armor: 0,
      },
      boss: { ...bossInput },
      spell: name,
      manaSpent: cost,
      effects: [],
      spells: [name],
      playerWin: false,
    });
  }

  while (true) {
    const node = pq.deq();

    if (node.playerWin) {
      return node.manaSpent;
    }

    const effectsBeforePlayer = performEffects(
      node.effects,
      node.player,
      node.boss
    );

    if (node.boss.hp <= 0) {
      pq.enq({
        manaSpent: node.manaSpent,
        spells: [...node.spells],
        playerWin: true,
      });
    }

    // player's turn
    switch (node.spell) {
      case "Magic Missile":
        node.boss.hp -= 4;
        break;
      case "Drain":
        node.boss.hp -= 2;
        node.player.hp += 2;
        break;
      case "Shield":
        effectsBeforePlayer.push({ name: "Shield", timer: 6 });
        break;
      case "Poison":
        effectsBeforePlayer.push({ name: "Poison", timer: 6 });
        break;
      case "Recharge":
        effectsBeforePlayer.push({ name: "Recharge", timer: 5 });
        break;
      default:
        throw new Error(`Invalid spell: ${node.spell}.`);
    }

    if (node.boss.hp <= 0) {
      pq.enq({
        manaSpent: node.manaSpent,
        spells: [...node.spells],
        playerWin: true,
      });
    }

    // boss's turn
    const effectsBeforeBoss = performEffects(
      effectsBeforePlayer,
      node.player,
      node.boss
    );

    if (node.boss.hp <= 0) {
      pq.enq({
        manaSpent: node.manaSpent,
        spells: [...node.spells],
        playerWin: true,
      });
    }

    let dmgDealt = node.boss.dmg - node.player.armor;
    dmgDealt = dmgDealt <= 0 ? 1 : dmgDealt;

    node.player.hp -= dmgDealt;

    if (node.player.hp > 0) {
      const spellChoices = Object.entries(spells).filter(([name, cost]) => {
        const foundEffect = effectsBeforeBoss.find(
          (effect) => effect.name === name
        );

        return (
          cost <= node.player.mana &&
          (foundEffect === undefined || foundEffect.timer === 1)
        );
      });

      for (const [name, cost] of spellChoices) {
        pq.enq({
          player: { ...node.player, mana: node.player.mana - cost },
          boss: { ...node.boss },
          spell: name,
          manaSpent: node.manaSpent + cost,
          effects: effectsBeforeBoss,
          spells: [...node.spells, name],
          playerWin: false,
        });
      }
    }
  }
};

const part2 = (bossInput) => {
  const spells = {
    "Magic Missile": 53,
    Drain: 73,
    Shield: 113,
    Poison: 173,
    Recharge: 229,
  };

  const pq = new PriorityQueue((a, b) => b.manaSpent - a.manaSpent);

  for (const [name, cost] of Object.entries(spells)) {
    pq.enq({
      player: {
        hp: 50,
        mana: 500 - cost,
        armor: 0,
      },
      boss: { ...bossInput },
      spell: name,
      manaSpent: cost,
      effects: [],
      spells: [name],
      playerWin: false,
    });
  }

  while (true) {
    const node = pq.deq();

    if (node.playerWin) {
      return node.manaSpent;
    }

    node.player.hp -= 1;

    const effectsBeforePlayer = performEffects(
      node.effects,
      node.player,
      node.boss
    );

    if (node.boss.hp <= 0) {
      pq.enq({
        manaSpent: node.manaSpent,
        spells: [...node.spells],
        playerWin: true,
      });
    }

    // player's turn
    switch (node.spell) {
      case "Magic Missile":
        node.boss.hp -= 4;
        break;
      case "Drain":
        node.boss.hp -= 2;
        node.player.hp += 2;
        break;
      case "Shield":
        effectsBeforePlayer.push({ name: "Shield", timer: 6 });
        break;
      case "Poison":
        effectsBeforePlayer.push({ name: "Poison", timer: 6 });
        break;
      case "Recharge":
        effectsBeforePlayer.push({ name: "Recharge", timer: 5 });
        break;
      default:
        throw new Error(`Invalid spell: ${node.spell}.`);
    }

    if (node.boss.hp <= 0) {
      pq.enq({
        manaSpent: node.manaSpent,
        spells: [...node.spells],
        playerWin: true,
      });
    }

    // boss's turn
    const effectsBeforeBoss = performEffects(
      effectsBeforePlayer,
      node.player,
      node.boss
    );

    if (node.boss.hp <= 0) {
      pq.enq({
        manaSpent: node.manaSpent,
        spells: [...node.spells],
        playerWin: true,
      });
    }

    let dmgDealt = node.boss.dmg - node.player.armor;
    dmgDealt = dmgDealt <= 0 ? 1 : dmgDealt;

    node.player.hp -= dmgDealt;

    if (node.player.hp > 0) {
      const spellChoices = Object.entries(spells).filter(([name, cost]) => {
        const foundEffect = effectsBeforeBoss.find(
          (effect) => effect.name === name
        );

        return (
          cost <= node.player.mana &&
          (foundEffect === undefined || foundEffect.timer === 1)
        );
      });

      for (const [name, cost] of spellChoices) {
        pq.enq({
          player: { ...node.player, mana: node.player.mana - cost },
          boss: { ...node.boss },
          spell: name,
          manaSpent: node.manaSpent + cost,
          effects: effectsBeforeBoss,
          spells: [...node.spells, name],
          playerWin: false,
        });
      }
    }
  }
};

//////

const input = {
  hp: 58,
  dmg: 9,
};

console.log(`Part 1: ${part1(input)}`);
console.log(`Part 2: ${part2(input)}`);
