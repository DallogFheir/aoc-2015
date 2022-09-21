import fs from "fs";

///////

class Reindeer {
  constructor(name, speed, flyingTime, restTime) {
    this.name = name;
    this.speed = speed;
    this.flyingTime = flyingTime;
    this.restTime = restTime;

    this.currentFlying = flyingTime;
    this.currentResting = restTime;
    this.currentDistance = 0;
    this.points = 0;
  }

  fly() {
    if (this.currentFlying !== 0) {
      this.currentDistance += this.speed;
      this.currentFlying--;
    } else if (this.currentResting !== 0) {
      this.currentResting--;
    } else {
      this.currentDistance += this.speed;
      this.currentFlying = this.flyingTime - 1;
      this.currentResting = this.restTime;
    }
  }
}

///////

const parseReindeer = (reindeerString) => {
  const match = reindeerString.match(
    /(?<reindeer>\w+) can fly (?<speed>\d+) km\/s for (?<flyingTime>\d+) seconds, but then must rest for (?<restTime>\d+) seconds./
  );

  const { reindeer, speed, flyingTime, restTime } = match.groups;
  return new Reindeer(
    reindeer,
    parseInt(speed),
    parseInt(flyingTime),
    parseInt(restTime)
  );
};

///////

const part1 = (reindeerStrings) => {
  const reindeers = reindeerStrings.map((reindeerString) =>
    parseReindeer(reindeerString)
  );

  for (let i = 0; i < 2503; i++) {
    reindeers.forEach((reindeer) => reindeer.fly());
  }

  let max = -Infinity;
  reindeers.forEach((reindeer) => {
    if (reindeer.currentDistance > max) {
      max = reindeer.currentDistance;
    }
  });

  return max;
};

const part2 = (reindeerStrings) => {
  const reindeers = reindeerStrings.map((reindeerString) =>
    parseReindeer(reindeerString)
  );

  for (let i = 0; i < 2503; i++) {
    reindeers.forEach((reindeer) => reindeer.fly());

    let leaderScore = -Infinity;
    let leaders = [];
    reindeers.forEach((reindeer) => {
      if (reindeer.currentDistance > leaderScore) {
        leaderScore = reindeer.currentDistance;
        leaders = [reindeer];
      } else if (reindeer.currentDistance === leaderScore) {
        leaders.push(reindeer);
      }
    });

    leaders.forEach((reindeer) => reindeer.points++);
  }

  let max = -Infinity;
  reindeers.forEach((reindeer) => {
    if (reindeer.points > max) {
      max = reindeer.points;
    }
  });

  return max;
};

///////

fs.readFile("day-14/input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const reindeerStrings = data.split("\r\n");

  console.log(`Part 1: ${part1(reindeerStrings)}`);
  console.log(`Part 2: ${part2(reindeerStrings)}`);
});
