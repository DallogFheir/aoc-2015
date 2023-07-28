import fs from "fs";

///////

const part1 = (ins) => {
  let floor = 0;

  for (const paren of ins) {
    if (paren === "(") floor += 1;
    else if (paren === ")") floor -= 1;
    else throw "Invalid character.";
  }

  return floor;
};

const part2 = (ins) => {
  let floor = 0;

  for (let i = 0; i < ins.length; i++) {
    const paren = ins[i];
    if (paren === "(") floor += 1;
    else if (paren === ")") floor -= 1;
    else throw "Invalid character.";

    if (floor < 0) {
      return i + 1;
    }
  }
};

///////

console.assert(part1("(())") === 0, 1);
console.assert(part1("(()(()(") === 3, 2);
console.assert(part1(")())())") === -3, 3);
console.assert(part2("()())") === 5, 4);

///////
fs.readFile("day-1/input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Part 1: ${part1(data)}`);
  console.log(`Part 2: ${part2(data)}`);
});
