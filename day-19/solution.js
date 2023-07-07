import fs from "fs";

//////

class ParseTree {
  constructor(symbol, left = null, right = null) {
    this.symbol = symbol;
    this.left = left;
    this.right = right;
  }
}

const parseReplacements = (replacements) => {
  const parsedReplacements = {};

  replacements.forEach((replacement) => {
    const [source, target] = replacement.split(" => ");

    if (source in parsedReplacements) {
      parsedReplacements[source].push(target);
    } else {
      parsedReplacements[source] = [target];
    }
  });

  return parsedReplacements;
};

const divideIntoAtoms = (molecule) => {
  return molecule.match(/[A-Z][a-z]*/g);
};

const convertToCnf = (productions) => {
  const reversedProductions = {};

  let newElementSymbol = "a";
  const stack = Object.entries(productions);
  while (stack.length > 0) {
    const [source, target] = stack.pop();

    for (let production of target) {
      const atoms = divideIntoAtoms(production);

      if (atoms.length > 2) {
        const newElement = "Z" + newElementSymbol;

        production = `${atoms[0]}${newElement}`;
        stack.push([newElement, [atoms.slice(1).join("")]]);

        const incrementedChar =
          newElementSymbol.charCodeAt(newElementSymbol.length - 1) + 1;
        if (incrementedChar < 123) {
          newElementSymbol =
            newElementSymbol.slice(0, -1) +
            String.fromCharCode(incrementedChar);
        } else {
          newElementSymbol = "a".repeat(newElementSymbol.length + 1);
        }
      }

      if (!(production in reversedProductions)) {
        reversedProductions[production] = [source];
      } else {
        reversedProductions[production].push(source);
      }
    }
  }

  return reversedProductions;
};

//////

const part1 = (replacements, molecule) => {
  const parsedReplacements = parseReplacements(replacements);
  const newMolecules = new Set();

  for (const [atom, repls] of Object.entries(parsedReplacements)) {
    for (const repl of repls) {
      const matches = molecule.matchAll(atom);

      for (const match of matches) {
        const index = match.index;

        const newMolecule =
          molecule.substring(0, index) +
          repl +
          molecule.substring(index + atom.length);
        newMolecules.add(newMolecule);
      }
    }
  }

  return newMolecules.size;
};

const part2 = (replacements, molecule) => {
  const parsedReplacements = parseReplacements(replacements);
  const reverseReplacements = convertToCnf(parsedReplacements);
  const atoms = molecule.match(/[A-Z][a-z]*/g);

  // matrix preparation
  const matrix = [
    Array(atoms.length)
      .fill(null)
      .map((_, idx) => [new ParseTree(atoms[idx])]),
  ];

  matrix.push(Array(atoms.length - 1).fill(null));
  for (let j = 0; j < atoms.length - 1; j++) {
    const tree1 = matrix[0][j][0];
    const tree2 = matrix[0][j + 1][0];
    const substring = tree1.symbol + tree2.symbol;

    const production = reverseReplacements[substring] ?? [];
    matrix[1][j] = [];
    for (const prod of production) {
      matrix[1][j].push(new ParseTree(prod, tree1, tree2));
    }
  }

  // CYK
  for (let i = 2; i < atoms.length; i++) {
    matrix.push(Array(atoms.length - i).fill(null));

    const substringSize = i + 1;
    for (let j = 0; j < atoms.length - i; j++) {
      const newProductions = [];
      const alreadyInNewProductions = new Set();

      for (let k = 1; k < substringSize; k++) {
        const set1 = matrix[k - 1][j];
        const set2 = matrix[substringSize - k - 1][j + k];

        for (const el1 of set1) {
          for (const el2 of set2) {
            const product = el1.symbol + el2.symbol;
            const replacement = reverseReplacements[product] ?? [];

            for (const repl of replacement) {
              if (!alreadyInNewProductions.has(repl)) {
                newProductions.push(new ParseTree(repl, el1, el2));
                alreadyInNewProductions.add(repl);
              }
            }
          }
        }
      }

      matrix[i][j] = newProductions;
    }
  }

  // backtracking the tree
  const parseTree = matrix
    .at(-1)
    .at(-1)
    .find((tree) => tree.symbol === "e");
  const stack = [[parseTree, null]];
  const visited = new Set();
  let counter = 0;
  while (stack.length > 0) {
    const tree = stack.pop();
    const [last, direction] = tree;

    if (!visited.has(tree) && last.left !== null && last.right !== null) {
      visited.add(tree);
      stack.push(tree);
      stack.push([last.left, "LEFT"], [last.right, "RIGHT"]);
    } else if (direction === "LEFT") {
      const [parent, _] = stack.at(-1);

      if (parent.symbol in parsedReplacements) {
        counter++;
      } else {
        parent.symbol = last.symbol + parent.right.symbol;
      }
    }
  }

  return counter;
};

//////

fs.readFile("day-19/input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const splitData = data.split("\r\n\r\n");
  const replacements = splitData[0].split("\r\n");
  const molecule = splitData[1];

  console.log(`Part 1: ${part1(replacements, molecule)}`);
  console.log(`Part 2: ${part2(replacements, molecule)}`);
});
