import fs from "fs";

//////

const countCharacters = (string) => {
  let numOfChars = 0;
  const trimmedString = string.substring(1, string.length - 1);

  let open = 0;
  for (let i = 0; i < trimmedString.length; i++) {
    const char = trimmedString[i];

    if (open !== 0) {
      if (char === "\\" || char === '"') {
        numOfChars++;
        open = 0;
      } else if (char === "x") {
        numOfChars++;
        open = 2;
      } else {
        open--;
      }
    } else {
      if (char === "\\") {
        open = 1;
      } else {
        numOfChars++;
      }
    }
  }

  return numOfChars;
};

//////

const part1 = (strings) => {
  let numOfCodeChars = 0;
  let numOfChars = 0;

  strings.forEach((string) => {
    numOfCodeChars += string.length;
    numOfChars += countCharacters(string);
  });

  return numOfCodeChars - numOfChars;
};

const part2 = (strings) => {
  let numOfCodeChars = 0;
  let numOfNewChars = 0;

  strings.forEach((string) => {
    numOfCodeChars += string.length;
    numOfNewChars +=
      string.length +
      4 +
      [...string].filter((char) => char === "\\" || char === '"').length -
      2;
  });

  return numOfNewChars - numOfCodeChars;
};

/////

fs.readFile("day-8/input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const strings = data.split("\r\n");

  console.log(`Part 1: ${part1(strings)}`);
  console.log(`Part 2: ${part2(strings)}`);
});
