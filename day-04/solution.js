import crypto from "crypto";

///////

const part1 = (secretKey) => {
  let i = 1;

  while (true) {
    const hash = crypto.createHash("md5");
    const msg = secretKey + String(i);
    hash.update(msg);
    const hashedMsg = hash.digest("hex");

    if (hashedMsg.slice(0, 5) === "00000") return i;

    i += 1;
  }
};

const part2 = (secretKey) => {
  let i = 1;

  while (true) {
    const hash = crypto.createHash("md5");
    const msg = secretKey + String(i);
    hash.update(msg);
    const hashedMsg = hash.digest("hex");

    if (hashedMsg.slice(0, 6) === "000000") return i;

    i += 1;
  }
};

//////

console.assert(part1("abcdef") === 609043);
console.assert(part1("pqrstuv") === 1048970);

// ///////

const input = "yzbqklnj";
console.log(`Part 1: ${part1(input)}`);
console.log(`Part 2: ${part2(input)}`);
