import fs from "fs";

//////

const parseSues = (sues) => {
  return sues.map((line) => {
    const match = line.match(
      /^Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)$/
    );

    const [
      _,
      number,
      firstProperty,
      firstNumber,
      secondProperty,
      secondNumber,
      thirdProperty,
      thirdNumber,
    ] = match;

    return {
      number: parseInt(number),
      [firstProperty]: parseInt(firstNumber),
      [secondProperty]: parseInt(secondNumber),
      [thirdProperty]: parseInt(thirdNumber),
    };
  });
};

//////

const part1 = (sues) => {
  const properties = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };
  const suesArray = parseSues(sues);

  for (const sue of suesArray) {
    let allCorrect = true;

    for (const [property, number] of Object.entries(properties)) {
      if (property in sue) {
        if (sue[property] !== number) {
          allCorrect = false;
          break;
        }
      }
    }

    if (allCorrect) {
      return sue.number;
    }
  }
};

const part2 = (sues) => {
  const properties = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };
  const suesArray = parseSues(sues);

  for (const sue of suesArray) {
    let allCorrect = true;

    for (const [property, number] of Object.entries(properties)) {
      if (property in sue) {
        if (
          ((property === "trees" || property === "cats") &&
            sue[property] <= number) ||
          ((property === "pomeranians" || property === "goldfish") &&
            sue[property] >= number) ||
          (!["trees", "cats", "pomeranians", "goldfish"].includes(property) &&
            sue[property] !== number)
        ) {
          allCorrect = false;
          break;
        }
      }
    }

    if (allCorrect) {
      return sue.number;
    }
  }
};

//////

fs.readFile("day-16/input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const sues = data.split("\r\n");

  console.log(`Part 1: ${part1(sues)}`);
  console.log(`Part 2: ${part2(sues)}`);
});
