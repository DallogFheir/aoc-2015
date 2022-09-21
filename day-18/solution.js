import fs from "fs";

//////

class PointSet {
  constructor() {
    this.map = new Map();
  }

  *[Symbol.iterator]() {
    yield* this.map.values();
  }

  add(point) {
    const [x, y] = point;
    this.map.set(`${x},${y}`, point);
  }

  has(point) {
    const [x, y] = point;
    return this.map.has(`${x},${y}`);
  }

  size() {
    return this.map.size;
  }
}

class PointMap {
  constructor() {
    this.map = new Map();
  }

  *[Symbol.iterator]() {
    for (const [pointString, number] of this.map.entries()) {
      const point = pointString.split(",").map((el) => parseInt(el));
      yield [point, number];
    }
  }

  add(point) {
    const [x, y] = point;
    const pointString = `${x},${y}`;

    if (!this.map.has(pointString)) {
      this.map.set(pointString, 0);
    }

    this.map.set(pointString, this.map.get(pointString) + 1);
  }
}

//////

const parseLights = (lights) => {
  const lightsOn = new PointSet();

  for (let i = 0; i < lights.length; i++) {
    for (let j = 0; j < lights[0].length; j++) {
      const light = lights[i][j];

      if (light === "#") {
        lightsOn.add([i, j]);
      }
    }
  }

  return lightsOn;
};

const getNeighbors = (point, gridXLength, gridYLength) => {
  const [x, y] = point;
  const neighbors = [];

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (!(i === 0) || !(j === 0)) {
        const neighborX = x + i;
        const neighborY = y + j;

        if (
          neighborX >= 0 &&
          neighborX < gridXLength &&
          neighborY >= 0 &&
          neighborY < gridYLength
        ) {
          neighbors.push([neighborX, neighborY]);
        }
      }
    }
  }

  return neighbors;
};

const animate = (lightsOn, gridXLength, gridYLength, numberOfTimes) => {
  for (let i = 0; i < numberOfTimes; i++) {
    const neighbors = new PointMap();
    const newLightsOn = new PointSet();

    for (const lightOn of lightsOn) {
      const lightNeighbors = getNeighbors(lightOn, gridXLength, gridYLength);

      for (const lightNeighbor of lightNeighbors) {
        neighbors.add(lightNeighbor);
      }
    }

    for (const [neighbor, number] of neighbors) {
      if (number === 3 || (number === 2 && lightsOn.has(neighbor))) {
        newLightsOn.add(neighbor);
      }
    }

    lightsOn = newLightsOn;
  }

  return lightsOn;
};

const animateFixed = (lightsOn, gridXLength, gridYLength, numberOfTimes) => {
  for (let i = 0; i < numberOfTimes; i++) {
    const neighbors = new PointMap();
    const newLightsOn = new PointSet();

    for (const lightOn of lightsOn) {
      const lightNeighbors = getNeighbors(lightOn, gridXLength, gridYLength);

      for (const lightNeighbor of lightNeighbors) {
        neighbors.add(lightNeighbor);
      }
    }

    for (const [neighbor, number] of neighbors) {
      if (number === 3 || (number === 2 && lightsOn.has(neighbor))) {
        newLightsOn.add(neighbor);
      }
    }
    newLightsOn.add([0, 0]);
    newLightsOn.add([gridXLength - 1, 0]);
    newLightsOn.add([0, gridYLength - 1]);
    newLightsOn.add([gridXLength - 1, gridYLength - 1]);

    lightsOn = newLightsOn;
  }

  return lightsOn;
};

//////

const part1 = (lights) => {
  const lightsOn = parseLights(lights);

  return animate(lightsOn, lights.length, lights[0].length, 100).size();
};

const part2 = (lights) => {
  const lightsOn = parseLights(lights);
  lightsOn.add([0, 0]);
  lightsOn.add([lights.length - 1, 0]);
  lightsOn.add([0, lights[0].length - 1]);
  lightsOn.add([lights.length - 1, lights[0].length - 1]);

  return animateFixed(lightsOn, lights.length, lights[0].length, 100).size();
};

//////

fs.readFile("day-18/input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lights = data.split("\r\n");

  console.log(`Part 1: ${part1(lights)}`);
  console.log(`Part 2: ${part2(lights)}`);
});
