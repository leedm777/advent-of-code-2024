import _ from "lodash";

function blink(stones: number[]): number[] {
  return _.reduce(
    stones,
    (acc, stone) => {
      if (stone === 0) {
        return [...acc, 1];
      }

      const numDigits = Math.floor(Math.log10(stone)) + 1;
      if ((numDigits & 1) === 0) {
        const factor = 10 ** (numDigits >> 1);
        const leftStone = Math.floor(stone / factor);
        const rightStone = stone - leftStone * factor;
        return [...acc, leftStone, rightStone];
      }

      return [...acc, 2024 * stone];
    },
    [] as number[],
  );
}

export function part1([input]: string[], numIterations = 25) {
  let stones = _(input)
    .split(" ")
    .map((s) => parseInt(s, 10))
    .value();
  for (let i = 0; i < numIterations; ++i) {
    stones = blink(stones);
  }
  return stones.length;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
