const part1 = (input) => {
  let prev = 20151125;

  for (let i = 2; ; i++) {
    let row = i;
    for (let column = 1; row > 0; column++) {
      prev = (prev * 252533) % 33554393;

      if (row === input[0] && column === input[1]) {
        return prev;
      }

      row--;
    }
  }
};

//////

const input = [2947, 3029];

console.log(`Part 1: ${part1(input)}`);
