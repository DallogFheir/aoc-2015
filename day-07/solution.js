import fs from "fs";

///////

const executeInstructions = (instructions) => {
  const knownValues = new Map();

  while (true) {
    instructions = instructions.filter((ins) => {
      const match = ins.match(
        /^(?:(?<value>\w+)|(NOT (?<notOperand>\w+))|((?<firstOperand>\w+) (?<operation>\w+) (?<secondOperand>\w+))) -> (?<output>\w+)$/
      );

      const groups = match.groups;
      const output = groups.output;
      if (groups.value) {
        const value = groups.value;
        const numberValue = parseInt(value);

        if (!Number.isNaN(numberValue)) {
          knownValues.set(output, numberValue);
        } else if (knownValues.has(value)) {
          knownValues.set(output, knownValues.get(value));
        } else {
          return true;
        }
      } else if (groups.notOperand) {
        const value = groups.notOperand;
        const numberValue = parseInt(value);

        if (!Number.isNaN(numberValue)) {
          knownValues.set(output, 65535 - numberValue);
        } else if (knownValues.has(value)) {
          knownValues.set(output, 65535 - knownValues.get(value));
        } else {
          return true;
        }
      } else if (
        groups.firstOperand &&
        groups.operation &&
        groups.secondOperand
      ) {
        const firstValue = groups.firstOperand;
        const firstNumberValue = parseInt(firstValue);
        const secondValue = groups.secondOperand;
        const secondNumberValue = parseInt(secondValue);

        let firstOperand;
        let secondOperand;
        if (!Number.isNaN(firstNumberValue)) {
          firstOperand = firstNumberValue;
        } else if (knownValues.has(firstValue)) {
          firstOperand = knownValues.get(firstValue);
        } else {
          return true;
        }
        if (!Number.isNaN(secondNumberValue)) {
          secondOperand = secondNumberValue;
        } else if (knownValues.has(secondValue)) {
          secondOperand = knownValues.get(secondValue);
        } else {
          return true;
        }

        switch (groups.operation) {
          case "AND":
            knownValues.set(output, firstOperand & secondOperand);
            break;
          case "OR":
            knownValues.set(output, firstOperand | secondOperand);
            break;
          case "LSHIFT":
            knownValues.set(output, firstOperand << secondOperand);
            break;
          case "RSHIFT":
            knownValues.set(output, firstOperand >> secondOperand);
            break;
          default:
            throw new Error(`Invalid operation: ${groups.operation}.`);
        }
      } else {
        throw new Error(`Invalid match for ${ins}.`);
      }

      return false;
    });

    if (instructions.length === 0) {
      break;
    }
  }

  return knownValues.get("a");
};

///////

fs.readFile("day-7/input-1.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const instructions = data.split("\r\n");

  console.log(`Part 1: ${executeInstructions(instructions)}`);
});

fs.readFile("day-7/input-2.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const instructions = data.split("\r\n");

  console.log(`Part 2: ${executeInstructions(instructions)}`);
});
