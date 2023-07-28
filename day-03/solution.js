import fs from "fs";

//////

const parseInstructions = (ins) => {
  const visitedHouses = { "0,0": 1 };

  const coords = [0, 0];
  for (const char of ins) {
    switch (char) {
      case ">":
        coords[0] += 1;
        break;
      case "<":
        coords[0] -= 1;
        break;
      case "^":
        coords[1] += 1;
        break;
      case "v":
        coords[1] -= 1;
        break;
      default:
        throw "Invalid character.";
    }

    if (coords in visitedHouses) {
      visitedHouses[coords] += 1;
    } else {
      visitedHouses[coords] = 1;
    }
  }

  return visitedHouses;
};

//////

const part1 = (ins) => {
  const visitedHouses = parseInstructions(ins);
  return Object.keys(visitedHouses).length;
};

const part2 = (ins) => {
  const visitedHouses = { "0,0": 2 };
  const santaCoords = [0, 0];
  const roboSantaCoords = [0, 0];

  for (let i = 0; i < ins.length; i++) {
    const coords = i % 2 === 0 ? santaCoords : roboSantaCoords;

    switch (ins[i]) {
      case ">":
        coords[0] += 1;
        break;
      case "<":
        coords[0] -= 1;
        break;
      case "^":
        coords[1] += 1;
        break;
      case "v":
        coords[1] -= 1;
        break;
      default:
        throw "Invalid character.";
    }

    if (coords in visitedHouses) {
      visitedHouses[coords] += 1;
    } else {
      visitedHouses[coords] = 1;
    }
  }

  return Object.keys(visitedHouses).length;
};

//////

console.assert(part1("^v^v^v^v^v") === 2);
console.assert(part1("^>v<") === 4);

//////

fs.readFile("day-3/input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Part 1: ${part1(data)}`);
  console.log(`Part 2: ${part2(data)}`);
});
