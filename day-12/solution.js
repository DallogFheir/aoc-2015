import fs from "fs";

///////

const part1 = (json) => {
  const queue = [JSON.parse(json)];
  let sum = 0;

  while (queue.length !== 0) {
    const currentElement = queue.pop();

    switch (typeof currentElement) {
      case "number":
        sum += currentElement;
        break;
      case "string":
        break;
      case "object":
        if (Array.isArray(currentElement)) {
          currentElement.forEach((el) => queue.push(el));
        } else {
          Object.values(currentElement).forEach((el) => queue.push(el));
        }
        break;
      default:
        throw new Error(`Unknown type: ${typeof currentElement}.`);
    }
  }

  return sum;
};

const part2 = (json) => {
  const queue = [JSON.parse(json)];
  let sum = 0;

  while (queue.length !== 0) {
    const currentElement = queue.pop();

    switch (typeof currentElement) {
      case "number":
        sum += currentElement;
        break;
      case "string":
        break;
      case "object":
        if (Array.isArray(currentElement)) {
          currentElement.forEach((el) => queue.push(el));
        } else if (!Object.values(currentElement).includes("red")) {
          Object.values(currentElement).forEach((el) => queue.push(el));
        }
        break;
      default:
        throw new Error(`Unknown type: ${typeof currentElement}.`);
    }
  }

  return sum;
};

//////

fs.readFile("day-12/input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Part 1: ${part1(data)}`);
  console.log(`Part 2: ${part2(data)}`);
});
