import fs from "fs";
import percom from "percom";

//////

const parseDistances = (distances) => {
  const map = new Map();

  distances.forEach((distance) => {
    const match = distance.match(/(\w+) to (\w+) = (\d+)/);
    const start = match[1];
    const end = match[2];
    const dist = parseInt(match[3]);

    if (!map.has(start)) {
      map.set(start, new Map());
    }
    if (!map.has(end)) {
      map.set(end, new Map());
    }

    map.get(start).set(end, dist);
    map.get(end).set(start, dist);
  });

  return map;
};

//////

const part1 = (distances) => {
  const map = parseDistances(distances);

  const possiblePaths = percom.per([...map.keys()], map.size);

  let min = Infinity;
  possiblePaths.forEach((path) => {
    let totalDist = 0;

    for (let i = 0; i < path.length - 1; i++) {
      const start = path[i];
      const end = path[i + 1];

      const dist = map.get(start).get(end);
      totalDist += dist;
    }

    if (totalDist < min) {
      min = totalDist;
    }
  });

  return min;
};

const part2 = (distances) => {
  const map = parseDistances(distances);

  const possiblePaths = percom.per([...map.keys()], map.size);

  let max = -Infinity;
  possiblePaths.forEach((path) => {
    let totalDist = 0;

    for (let i = 0; i < path.length - 1; i++) {
      const start = path[i];
      const end = path[i + 1];

      const dist = map.get(start).get(end);
      totalDist += dist;
    }

    if (totalDist > max) {
      max = totalDist;
    }
  });

  return max;
};

//////

fs.readFile("day-9/input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const distances = data.split("\r\n");

  console.log(`Part 1: ${part1(distances)}`);
  console.log(`Part 2: ${part2(distances)}`);
});
