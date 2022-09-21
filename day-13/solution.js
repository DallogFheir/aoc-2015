import fs from "fs";
import percom from "percom";

///////

const parseArrangement = (list) => {
  const map = new Map();

  list.forEach((el) => {
    const match = el.match(
      /(?<sitter>\w+) would (?<sign>\w+) (?<amount>\d+) happiness units by sitting next to (?<neighbor>\w+)./
    );

    const { sitter, sign, amount, neighbor } = match.groups;
    const realAmount = sign === "gain" ? parseInt(amount) : -parseInt(amount);

    if (!map.has(sitter)) {
      map.set(sitter, new Map());
    }

    map.get(sitter).set(neighbor, realAmount);
  });

  return map;
};

///////

const part1 = (list) => {
  const map = parseArrangement(list);
  const arrangements = percom.per([...map.keys()], map.size);
  let max = -Infinity;

  arrangements.forEach((arrangement) => {
    let happiness = 0;

    for (let i = 0; i < arrangement.length - 1; i++) {
      const sitter = arrangement[i];
      const neighbor = arrangement[i + 1];

      happiness += map.get(sitter).get(neighbor);
      happiness += map.get(neighbor).get(sitter);
    }

    const sitter = arrangement[0];
    const neighbor = arrangement[arrangement.length - 1];
    happiness += map.get(sitter).get(neighbor);
    happiness += map.get(neighbor).get(sitter);

    if (happiness > max) {
      max = happiness;
    }
  });

  return max;
};

const part2 = (list) => {
  const map = parseArrangement(list);
  map.set("me", new Map());
  [...map.keys()].forEach((name) => {
    map.get("me").set(name, 0);
    map.get(name).set("me", 0);
  });

  const arrangements = percom.per([...map.keys()], map.size);
  let max = -Infinity;

  arrangements.forEach((arrangement) => {
    let happiness = 0;

    for (let i = 0; i < arrangement.length - 1; i++) {
      const sitter = arrangement[i];
      const neighbor = arrangement[i + 1];

      happiness += map.get(sitter).get(neighbor);
      happiness += map.get(neighbor).get(sitter);
    }

    const sitter = arrangement[0];
    const neighbor = arrangement[arrangement.length - 1];
    happiness += map.get(sitter).get(neighbor);
    happiness += map.get(neighbor).get(sitter);

    if (happiness > max) {
      max = happiness;
    }
  });

  return max;
};

///////

fs.readFile("day-13/input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const list = data.split("\r\n");

  console.log(`Part 1: ${part1(list)}`);
  console.log(`Part 2: ${part2(list)}`);
});
