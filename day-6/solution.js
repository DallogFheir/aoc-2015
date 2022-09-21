import fs from "fs";

//////

class PointSet {
  constructor() {
    this.map = new Map();
  }

  add(point) {
    const [x, y] = point;
    this.map.set(`${x},${y}`, 0);
  }

  remove(point) {
    const [x, y] = point;
    this.map.delete(`${x},${y}`);
  }

  toggle(point) {
    const [x, y] = point;
    const pointString = `${x},${y}`;

    if (this.map.has(pointString)) {
      this.map.delete(pointString);
    } else {
      this.map.set(pointString, 0);
    }
  }

  size() {
    return this.map.size;
  }

  addBrightness(point, value) {
    const [x, y] = point;
    const pointString = `${x},${y}`;

    if (!this.map.has(pointString)) {
      this.map.set(pointString, 0);
    }

    const toAdd =
      this.map.get(pointString) + value >= 0
        ? this.map.get(pointString) + value
        : 0;

    this.map.set(pointString, toAdd);
  }

  brightness() {
    return [...this.map.values()].reduce((acc, v) => acc + v);
  }
}

//////

const parseInstructions = (insString) => {
  const match = insString.match(/^(.+) (\d+),(\d+) through (\d+),(\d+)$/);
  return [
    match[1],
    [parseInt(match[2]), parseInt(match[3])],
    [parseInt(match[4]), parseInt(match[5])],
  ];
};

const executeInstruction = (ins, lights) => {
  const [x1, y1] = ins[1];
  const [x2, y2] = ins[2];

  let func;
  switch (ins[0]) {
    case "turn on":
      func = lights.add;
      break;
    case "turn off":
      func = lights.remove;
      break;
    case "toggle":
      func = lights.toggle;
      break;
    default:
      throw new Error("Invalid command.");
  }

  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      func.call(lights, [x, y]);
    }
  }
};

const executeInstructionFixed = (ins, lights) => {
  const [x1, y1] = ins[1];
  const [x2, y2] = ins[2];

  let func;
  switch (ins[0]) {
    case "turn on":
      func = function (point) {
        return lights.addBrightness(point, 1);
      };
      break;
    case "turn off":
      func = function (point) {
        return lights.addBrightness(point, -1);
      };
      break;
    case "toggle":
      func = function (point) {
        return lights.addBrightness(point, 2);
      };
      break;
    default:
      throw new Error("Invalid command.");
  }

  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      func.call(lights, [x, y]);
    }
  }
};

//////

const part1 = (instructions) => {
  const lights = new PointSet();

  instructions.forEach((ins) => {
    executeInstruction(ins, lights);
  });

  return lights.size();
};

const part2 = (instructions) => {
  const lights = new PointSet();

  instructions.forEach((ins) => {
    executeInstructionFixed(ins, lights);
  });

  return lights.brightness();
};

/////

fs.readFile("day-6/input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const instructions = data.split("\r\n").map((el) => parseInstructions(el));

  console.log(`Part 1: ${part1(instructions)}`);
  console.log(`Part 1: ${part2(instructions)}`);
});
