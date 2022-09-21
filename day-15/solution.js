import fs from "fs";

//////

const parseIngredients = (ingredients) => {
  const ingredientArray = [];

  ingredients.forEach((ingredient) => {
    const match = ingredient.match(
      /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/
    );

    const [_, name, capacity, durability, flavor, texture, calories] = match;

    ingredientArray.push({
      name,
      capacity,
      durability,
      flavor,
      texture,
      calories,
    });
  });

  return ingredientArray;
};

//////

const part1 = (ingredients) => {
  const ingredientsArray = parseIngredients(ingredients);

  let max = -Infinity;
  for (let i = 0; i < 100; i++) {
    for (let j = 0; i + j < 100; j++) {
      for (let k = 0; i + j + k < 100; k++) {
        let l = 100 - i - j - k;
        const amounts = [i, j, k, l];

        let capacity = ingredientsArray.reduce(
          (acc, cur, idx) => acc + cur.capacity * amounts[idx],
          0
        );
        let durability = ingredientsArray.reduce(
          (acc, cur, idx) => acc + cur.durability * amounts[idx],
          0
        );
        let flavor = ingredientsArray.reduce(
          (acc, cur, idx) => acc + cur.flavor * amounts[idx],
          0
        );
        let texture = ingredientsArray.reduce(
          (acc, cur, idx) => acc + cur.texture * amounts[idx],
          0
        );

        capacity = capacity < 0 ? 0 : capacity;
        durability = durability < 0 ? 0 : durability;
        flavor = flavor < 0 ? 0 : flavor;
        texture = texture < 0 ? 0 : texture;

        const totalScore = capacity * durability * flavor * texture;

        if (totalScore > max) {
          max = totalScore;
        }
      }
    }
  }

  return max;
};

const part2 = (ingredients) => {
  const ingredientsArray = parseIngredients(ingredients);

  let max = -Infinity;
  for (let i = 0; i < 100; i++) {
    for (let j = 0; i + j < 100; j++) {
      for (let k = 0; i + j + k < 100; k++) {
        let l = 100 - i - j - k;
        const amounts = [i, j, k, l];

        let capacity = ingredientsArray.reduce(
          (acc, cur, idx) => acc + cur.capacity * amounts[idx],
          0
        );
        let durability = ingredientsArray.reduce(
          (acc, cur, idx) => acc + cur.durability * amounts[idx],
          0
        );
        let flavor = ingredientsArray.reduce(
          (acc, cur, idx) => acc + cur.flavor * amounts[idx],
          0
        );
        let texture = ingredientsArray.reduce(
          (acc, cur, idx) => acc + cur.texture * amounts[idx],
          0
        );
        const calories = ingredientsArray.reduce(
          (acc, cur, idx) => acc + cur.calories * amounts[idx],
          0
        );

        capacity = capacity < 0 ? 0 : capacity;
        durability = durability < 0 ? 0 : durability;
        flavor = flavor < 0 ? 0 : flavor;
        texture = texture < 0 ? 0 : texture;

        const totalScore = capacity * durability * flavor * texture;

        if (calories === 500 && totalScore > max) {
          max = totalScore;
        }
      }
    }
  }

  return max;
};

//////

fs.readFile("day-15/input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const ingredients = data.split("\r\n");

  console.log(`Part 1: ${part1(ingredients)}`);
  console.log(`Part 2: ${part2(ingredients)}`);
});
