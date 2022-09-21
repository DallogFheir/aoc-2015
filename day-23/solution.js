import fs from "fs";

//////

const parseInstructions = (instructions) => {
  return instructions.map((ins) => {
    const match = ins.match(/^(\w+) ([+-]?\w+)(?:, ([+-]\d+))?$/);
    const [_, command, registerOrAmount, secondAmount] = match;

    const amount = parseInt(registerOrAmount);
    if (Number.isNaN(amount)) {
      const insObj = { command, register: registerOrAmount };

      if (secondAmount) {
        insObj.amount = parseInt(secondAmount);
      }

      return insObj;
    }

    return { command, amount };
  });
};

const executeInstructions = (
  instructions,
  startValueA = 0,
  startValueB = 0
) => {
  const registers = { a: startValueA, b: startValueB };

  let pointer = 0;
  while (pointer < instructions.length) {
    const ins = instructions[pointer];

    switch (ins.command) {
      case "hlf":
        registers[ins.register] /= 2;
        pointer++;
        break;
      case "tpl":
        registers[ins.register] *= 3;
        pointer++;
        break;
      case "inc":
        registers[ins.register]++;
        pointer++;
        break;
      case "jmp":
        pointer += ins.amount;
        break;
      case "jie":
        if (registers[ins.register] % 2 === 0) {
          pointer += ins.amount;
        } else {
          pointer++;
        }
        break;
      case "jio":
        if (registers[ins.register] === 1) {
          pointer += ins.amount;
        } else {
          pointer++;
        }
        break;
      default:
        throw new Error("Invalid command.");
    }
  }

  return registers;
};

//////

const part1 = (instructions) => {
  const parsedIns = parseInstructions(instructions);
  const registersAfterExecution = executeInstructions(parsedIns);

  return registersAfterExecution.b;
};

const part2 = (instructions) => {
  const parsedIns = parseInstructions(instructions);
  const registersAfterExecution = executeInstructions(parsedIns, 1);

  return registersAfterExecution.b;
};

//////

fs.readFile("day-23/input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const instructions = data.split("\r\n");

  console.log(`Part 1: ${part1(instructions)}`);
  console.log(`Part 2: ${part2(instructions)}`);
});
