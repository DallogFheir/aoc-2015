const factorize = (number) => {
  const factors = new Set();

  for (let i = 1; i <= Math.floor(Math.sqrt(number)); i++) {
    if (number % i === 0) {
      factors.add(i);
      factors.add(number / i);
    }
  }

  return [...factors];
};

///////

const part1 = (input) => {
  const target = input / 10;

  for (let i = 1; ; i++) {
    const factors = factorize(i);

    if (factors.reduce((acc, cur) => acc + cur) >= target) {
      return i;
    }
  }
};

const part2 = () => {
  const target = input / 11;
  const factorsCount = {};

  for (let i = 1; ; i++) {
    const factors = factorize(i);

    for (const factor of factors) {
      if (!(factor in factorsCount)) {
        factorsCount[factor] = 0;
      }

      factorsCount[factor] += 1;
    }

    if (
      factors
        .filter((factor) => factorsCount[factor] <= 50)
        .reduce((acc, cur) => acc + cur) >= target
    ) {
      return i;
    }
  }
};

//////

const input = 34000000;

console.log(`Part 1: ${part1(input)}`);
console.log(`Part 2: ${part2(input)}`);
