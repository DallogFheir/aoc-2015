const lookAndSay = (prev) => {
  let current = prev[0];
  let currentRun = 1;
  let output = "";

  for (const char of prev.substring(1)) {
    if (char === current) {
      currentRun++;
    } else {
      output += `${currentRun}${current}`;
      current = char;
      currentRun = 1;
    }
  }
  output += `${currentRun}${current}`;

  return output;
};

const applyLookAndSay = (input, numberOfTimes) => {
  let output = input;

  for (let i = 0; i < numberOfTimes; i++) {
    output = lookAndSay(output);
  }

  return output.length;
};

//////

const part1 = (input) => {
  return applyLookAndSay(input, 40);
};

const part2 = (input) => {
  return applyLookAndSay(input, 50);
};

//////

console.assert(lookAndSay("1") === "11");
console.assert(lookAndSay("11") === "21");
console.assert(lookAndSay("21") === "1211");
console.assert(lookAndSay("1211") === "111221");
console.assert(lookAndSay("111221") === "312211");

//////

const input = "1113222113";

console.log(`Part 1: ${part1(input)}`);
console.log(`Part 2: ${part2(input)}`);
