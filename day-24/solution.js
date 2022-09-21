import fs from "fs";
import percom from "percom";

//////
const balanceSleigh = (weights, divisions) => {
  const weightSumPerGroup =
    weights.reduce((acc, curr) => acc + curr) / divisions;

  for (let i = 1; i <= weights.length; i++) {
    const combinations = percom.com(weights, i);

    const mins = [];
    for (const com of combinations) {
      const sum = com.reduce((acc, curr) => acc + curr);

      if (sum === weightSumPerGroup) {
        mins.push(com);
      }
    }

    if (mins.length > 0) {
      let minQE = Infinity;

      for (const min of mins) {
        const product = min.reduce((acc, curr) => acc * curr);

        if (product < minQE) {
          minQE = product;
        }
      }

      return minQE;
    }
  }
};

//////

const part1 = (weights) => {
  return balanceSleigh(weights, 3);
};

const part2 = (weights) => {
  return balanceSleigh(weights, 4);
};

//////

fs.readFile("day-24/input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const splitData = data.split("\n").map((weight) => parseInt(weight));

  console.log(`Part 1: ${part1(splitData)}`);
  console.log(`Part 2: ${part2(splitData)}`);
});
