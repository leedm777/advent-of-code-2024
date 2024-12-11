import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function blink(stones: number[]): number[] {
  return _.reduce(
    stones,
    (acc, stone) => {
      if (stone === 0) {
        acc.push(1);
        return acc;
      }

      const numDigits = Math.floor(Math.log10(stone)) + 1;
      if ((numDigits & 1) === 0) {
        const factor = 10 ** (numDigits >> 1);
        const leftStone = Math.floor(stone / factor);
        const rightStone = stone - leftStone * factor;
        acc.push(leftStone);
        acc.push(rightStone);
        return acc;
      }

      acc.push(2024 * stone);
      return acc;
    },
    [] as number[],
  );
}

function blinkLen(stone: number, numBlinks: number): number {
  if (numBlinks === 0) {
    return 1;
  }

  if (stone === 0) {
    return blinkLen(1, numBlinks - 1);
  }

  const numDigits = Math.floor(Math.log10(stone)) + 1;
  if ((numDigits & 1) === 0) {
    const factor = 10 ** (numDigits >> 1);
    const leftStone = Math.floor(stone / factor);
    const rightStone = stone - leftStone * factor;
    return (
      blinkLen(leftStone, numBlinks - 1) + blinkLen(rightStone, numBlinks - 1)
    );
  }

  return blinkLen(2024 * stone, numBlinks - 1);
}

export function part1([input]: string[], numIterations = 25) {
  return _(input)
    .split(" ")
    .map((s) => parseInt(s, 10))
    .map((stone) => blinkLen(stone, numIterations))
    .sum();
}

export function part2(input: string[]) {
  return part1(input, 75);
}
