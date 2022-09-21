const checkIfValid = (password) => {
  if (["i", "o", "l"].some((letter) => password.includes(letter))) {
    return false;
  }

  if ([...password.matchAll(/([a-z])\1/g)].length < 2) {
    return false;
  }

  let prev = password[0];
  let currentRun = 0;
  for (const char of password.substring(1)) {
    if (prev.charCodeAt(0) + 1 === char.charCodeAt(0)) {
      currentRun++;
    } else {
      currentRun = 0;
    }

    if (currentRun === 2) {
      return true;
    }

    prev = char;
  }

  return false;
};

const incrementString = (string) => {
  const stringSet = new Set(string);
  if (stringSet.size === 1 && stringSet.has("z")) {
    return string;
  }

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let lastIdx = string.length - 1;

  while (true) {
    if (lastIdx < 0) {
      return string;
    }

    const last = string.charAt(lastIdx);
    const incremented = alphabet.indexOf(last) + 1;

    if (incremented < alphabet.length) {
      return (
        string.substring(0, lastIdx) +
        alphabet.charAt(incremented) +
        string.substring(lastIdx + 1)
      );
    }

    string = string.substring(0, lastIdx) + "a" + string.substring(lastIdx + 1);
    lastIdx -= 1;
  }
};

//////

const part1 = (currentPassword) => {
  currentPassword = incrementString(currentPassword);

  while (true) {
    if (checkIfValid(currentPassword)) {
      return currentPassword;
    }

    currentPassword = incrementString(currentPassword);
  }
};

//////

const input = "cqjxjnds";

const nextPassword = part1(input);
console.log(`Part 1: ${nextPassword}`);
console.log(`Part 1: ${part1(nextPassword)}`);
