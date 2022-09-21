import fs from "fs";

//////

const part1 = () => {};

const part2 = () => {};

//////

fs.readFile("day-/input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const splitData = data.split("\r\n");

  console.log(`Part 1: ${part1(splitData)}`);
  console.log(`Part 2: ${part2(splitData)}`);
});
