import fs from "fs";

////////

const isNice = (string) => {
  return (
    [...string.matchAll(/[aeiou]/g)].length >= 3 &&
    string.match(/([a-z])\1/g) !== null &&
    string.match(/ab|cd|pq|xy/g) === null
  );
};

const isNiceBetter = (string) => {
  let isTwoGroups = false;
  for (let i = 0; i <= string.length - 2; i += 1) {
    const group = string.slice(i, i + 2);

    if ([...string.matchAll(group)].length > 1) {
      isTwoGroups = true;
      break;
    }
  }
  if (!isTwoGroups) {
    return false;
  }

  let isIntertwined = false;
  for (let i = 0; i <= string.length - 3; i += 1) {
    if (string[i] === string[i + 2]) {
      isIntertwined = true;
      break;
    }
  }
  return isIntertwined;
};

//////

const part1 = (strings) => {
  let counter = 0;

  for (const string of strings) {
    if (isNice(string)) {
      counter += 1;
    }
  }

  return counter;
};

const part2 = (strings) => {
  let counter = 0;

  for (const string of strings) {
    if (isNiceBetter(string)) {
      counter += 1;
    }
  }

  return counter;
};

////////

fs.readFile("day-5/input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const strings = data.split("\r\n");
  console.log(`Part 1: ${part1(strings)}`);
  console.log(`Part 2: ${part2(strings)}`);
});
