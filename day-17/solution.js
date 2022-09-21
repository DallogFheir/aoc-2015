import fs from "fs";

//////

const findDivisions = (sortedContainers, target) => {
  const containerTable = [
    { containerVolume: 0, left: [{ leftVolume: target, leftContainers: [] }] },
  ];
  const divisions = [];

  for (const container of sortedContainers) {
    const newContainer = {
      containerVolume: container,
      left: [],
    };

    for (const otherContainer of containerTable) {
      const { left } = otherContainer;

      for (const leftContainer of left) {
        const { leftVolume, leftContainers } = leftContainer;

        if (leftVolume === container) {
          divisions.push(leftContainers.concat(container));
        } else if (leftVolume - container >= container) {
          newContainer.left.push({
            leftVolume: leftVolume - container,
            leftContainers: leftContainers.concat(container),
          });
        }
      }
    }

    containerTable.push(newContainer);
  }

  return divisions;
};

//////

const part1 = (containers) => {
  const divisions = findDivisions(containers, 150);

  return divisions.length;
};

const part2 = (containers) => {
  const divisions = findDivisions(containers, 150);

  let min = Infinity;
  let numberOfMin = 0;
  divisions.forEach((division) => {
    const length = division.length;

    if (length < min) {
      min = length;
      numberOfMin = 1;
    } else if (length === min) {
      numberOfMin++;
    }
  });

  return numberOfMin;
};

//////

fs.readFile("day-17/input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const containers = data
    .split("\r\n")
    .map((el) => parseInt(el))
    .sort((a, b) => a - b);

  console.log(`Part 1: ${part1(containers)}`);
  console.log(`Part 2: ${part2(containers)}`);
});
