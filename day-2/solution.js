import fs from "fs";

///////

const findPaperForBox = (boxSize) => {
  const sides = [
    2 * boxSize[0] * boxSize[1],
    2 * boxSize[0] * boxSize[2],
    2 * boxSize[1] * boxSize[2],
  ];
  const smallest = Math.min(...sides);

  return sides.reduce((prev, cur) => prev + cur) + smallest / 2;
};

const findRibbon = (boxSize) => {
  const smallestSides = [...boxSize].sort((a, b) => a - b).slice(0, 2);
  const perimeter = (smallestSides[0] + smallestSides[1]) * 2;
  const volume = boxSize.reduce((prev, cur) => prev * cur);

  return perimeter + volume;
};

///////

const part1 = (boxes) => {
  let sum = 0;
  boxes.forEach((val) => {
    sum += findPaperForBox(val);
  });

  return sum;
};

const part2 = (boxes) => {
  let sum = 0;
  boxes.forEach((val) => {
    sum += findRibbon(val);
  });

  return sum;
};

///////

console.assert(findPaperForBox([1, 1, 10]) === 43, 1);
console.assert(findRibbon([4, 3, 2]) === 34, 2);
console.assert(findRibbon([1, 10, 1]) === 14, 3);

///////

fs.readFile("day-2/input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const boxes = data
    .split("\r\n")
    .map((boxString) => boxString.split("x").map((dim) => parseInt(dim, 10)));

  console.log(`Part 1: ${part1(boxes)}`);
  console.log(`Part 2: ${part2(boxes)}`);
});
