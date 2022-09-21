import fs from "fs";

//////

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

const part2 = (molecule) => {
  // based on this: https://www.reddit.com/r/adventofcode/comments/3xflz8/comment/cy4etju/?utm_source=share&utm_medium=web2x&context=3
  const atoms = [];
  let currentSeq = "";
  for (const letter of molecule) {
    if (letter.toUpperCase() === letter && currentSeq !== "") {
      atoms.push(currentSeq);
      currentSeq = letter;
    } else {
      currentSeq += letter;
    }
  }
  atoms.push(currentSeq);

  let rnArCount = 0;
  let yCount = 0;
  for (const atom of atoms) {
    if (atom === "Rn" || atom === "Ar") {
      rnArCount++;
    } else if (atom === "Y") {
      yCount++;
    }
  }

  return atoms.length - rnArCount - 2 * yCount - 1;
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
  console.log(`Part 2: ${part2(molecule)}`);
});
